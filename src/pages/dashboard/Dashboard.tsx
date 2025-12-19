import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WishCard from "~/components/WishCard/WishCard";
import useAppContext from "~/hooks/useAppContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import WishForm from "~/components/WishForm/WishForm"; 
import WishFilters from "~/components/WishFilters/WishFilters";
import Pagination from "~/components/Pagination/Pagination";
import { DEFAULT_FILTERS, PAGINATION } from "~/constants/const";
import { styles } from "~/constants/styles";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFilter = searchParams.get("date") || DEFAULT_FILTERS.date;
  const priceFilter = searchParams.get("price") || DEFAULT_FILTERS.price;
  const currentPage = Number(searchParams.get("page")) || PAGINATION.defaultPage;
  const { wishes, loading, totalPages, error, fetchWishes } = useAppContext();
  
	useEffect(() => {
    fetchWishes(dateFilter, priceFilter, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, priceFilter, currentPage]);

  const handleDateFilterChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("date", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePriceFilterChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("price", value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(page));
      return prev;
    });
  };

  const handleAddWish = () => {
    setIsAddModalOpen(true);
  }

  const handleViewDetails = (id: string) => {
    navigate(`/wishes/${id}`);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className={`text-3xl sm:text-4xl ${styles.header}`}>
            Welcome to your WishList!
          </h1>
          <p className="mt-2 text-lg">
            Manage your dreams and keep track of what you want.
          </p>
        </div>

        <button
          onClick={handleAddWish}
          className={`inline-flex items-center gap-2 px-5 py-3 ${styles.ctaButton} shrink-0`}
        >
          <PlusIcon className="w-4 h-4" />
          Add new wish
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b">
        <WishFilters
          dateFilter={dateFilter}
          priceFilter={priceFilter}
          onDateFilterChange={handleDateFilterChange}
          onPriceFilterChange={handlePriceFilterChange}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          loading
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-center">
          Error loading wishes: {error}
        </div>
      ) : wishes.length === 0 ? (
        <div className={`text-center py-20 ${styles.card}`}>
          <div className="mx-auto h-12 w-12 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900">No wishes yet</h3>
          <p className="mt-1 text-slate-500">
            Get started by creating a new wish.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishes.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                onDetails={handleViewDetails}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {isAddModalOpen && <WishForm onClose={() => setIsAddModalOpen(false)} />}
    </main>
  );
}

export default Dashboard;