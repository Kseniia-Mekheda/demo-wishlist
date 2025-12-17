import { createContext, useState } from 'react';
import useApi from '~/hooks/useApi';
import URLs from '~/constants/routes';
import Snackbar from '~/components/Snackbar/Snackbar';
import type { Wish, NotificationInterface } from '~/types/common/interfaces';
import type { AppContextInterface } from '~/types/context/app-context-interface';

const AppContext = createContext<AppContextInterface | null>(null); 

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishes, setWishes] = useState<Wish[]>([]); 
  const { request, loading, error, resetError } = useApi();
  const [notification, setNotification] = useState<NotificationInterface | null>(null);

  const fetchWishes = async () => {
    try {
      const data = await request<Wish[]>(URLs.api.wishes, 'GET');
      setWishes(data);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error'; 
      setNotification({ message: errorMsg, type: 'error' });
    }
  }
  
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
      const editedWish = await request<Wish>(`${URLs.api.wishes}/${id}`, 'POST', updatedWish); 
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
    <AppContext.Provider value={{ wishes, loading, error, fetchWishes, addWish, updateWish, deleteWish }}>
      { children }
      {notification && (
        <Snackbar
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </AppContext.Provider>
  )
};

export { AppContext, AppProvider };