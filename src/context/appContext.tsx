import { createContext, useState } from 'react';
import useApi from '~/hooks/useApi';
import URLs from '~/constants/routes';
import Snackbar from '~/components/Snackbar/Snackbar';
import type { Wish, NotificationInterface } from '~/types/common/interfaces';
import type { AppContextInterface } from '~/types/context/app-context-interface';
import { DEFAULT_FILTERS, PAGINATION } from "~/constants/const";

const AppContext = createContext<AppContextInterface | null>(null); 

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishes, setWishes] = useState<Wish[]>([]); 
  const [currentWish, setCurrentWish] = useState<Wish | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const { request, loading, error, resetError } = useApi();
  const [notification, setNotification] = useState<NotificationInterface | null>(null);

  const fetchWishes = async (
    dateFilter = DEFAULT_FILTERS.date,
    priceFilter = DEFAULT_FILTERS.price,
    page = PAGINATION.defaultPage
  ) => {
    try {
      const sortParams = buildSortParams(dateFilter, priceFilter);
      const url = `${URLs.api.wishes}?${sortParams}&_page=${page}&_per_page=${PAGINATION.itemsPerPage}`;
      console.log("Fetching URL:", url);
      const response = await request<{
        data: Wish[];
        pages: number;
        first: number;
        last: number;
        prev: number | null;
        next: number | null;
        items: number;
      }>(url, "GET");
      setWishes(response.data);
      setTotalPages(response.pages);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Unknown error";
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  const fetchWishById = async (id: string) => {
    try {
      const data = await request<Wish>(`${URLs.api.wishes}/${id}`, "GET");
      setCurrentWish(data);
      return data;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Unknown error";
      setNotification({ message: errorMsg, type: "error" });
      return null;
    }
  };
  
  const addWish = async (wish: Omit<Wish, 'id'>) => {
    resetError();
    try {
      const newWish = await request<Wish>(URLs.api.wishes, 'POST', wish); 
      setWishes(prev => [...prev, newWish]);
      setNotification({ message: 'Wish added successfully', type: 'success' });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setNotification({ message: errorMsg, type: 'error' });
    }
  }

  const updateWish = async (id: string, updatedWish: Partial<Omit<Wish, 'id'>>) => {
    resetError();
    try {
      const editedWish = await request<Wish>(`${URLs.api.wishes}/${id}`, 'PATCH', updatedWish); 
      setWishes(prev => prev.map(wish => wish.id === id ? editedWish : wish)); 
      setNotification({ message: 'Wish updated successfully', type: 'success' });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setNotification({ message: errorMsg, type: 'error' });
    }
  }

  const deleteWish = async (id: string) => {
    resetError();
    try {
      await request(`${URLs.api.wishes}/${id}`, 'DELETE');
      setWishes(prev => prev.filter(wish => wish.id !== id)); 
      setNotification({ message: 'Wish deleted successfully', type: 'success' });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setNotification({ message: errorMsg, type: 'error' });
    }
  }

  return (
    <AppContext.Provider
      value={{
        wishes,
        currentWish,
        totalPages,
        loading,
        error,
        fetchWishes,
        fetchWishById,
        addWish,
        updateWish,
        deleteWish,
      }}
    >
      {notification && (
        <Snackbar
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

const buildSortParams = (dateFilter: string, priceFilter: string): string => {
  const params = new URLSearchParams();

  const dateSort = dateFilter === "newest" ? "-dateAdded" : "dateAdded";
  const priceSort = priceFilter === "highToLow" ? "-price" : "price";

  params.set("_sort", `${dateSort},${priceSort}`);

  return params.toString();
};

export { AppContext, AppProvider };