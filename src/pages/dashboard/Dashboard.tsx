import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishCard from "~/components/WishCard/WishCard";
import useAppContext from "~/hooks/useAppContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import WishForm from "~/components/WishForm/WishForm"; 
import DeleteWishForm from "~/components/DeleteWishForm/DeleteWishForm";
import type { Wish } from "~/types/common/interfaces";
import WishFilters from "~/components/WishFilters/WishFilters";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<string>("newest");
  const [priceFilter, setPriceFilter] = useState<string>("highToLow");
  const { wishes, loading, error, fetchWishes } = useAppContext();
  
	useEffect(() => {
    fetchWishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1E87] tracking-tight">
            Welcome to your WishList!
          </h1>
          <p className="mt-2 text-lg">
            Manage your dreams and keep track of what you want.
          </p>
        </div>

        <button
          onClick={handleAddWish}
          className="inline-flex items-center gap-2 bg-[#D4D4FA] border-t border-l border-r border-black border-b-4 text-black text-sm px-5 py-3 rounded-3xl hover:bg-[#1C1E87] hover:text-white hover:border-none transition-all active:scale-95 shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          Add new wish
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b">
        <WishFilters
          dateFilter={dateFilter}
          priceFilter={priceFilter}
          onDateFilterChange={setDateFilter}
          onPriceFilterChange={setPriceFilter}
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
        <div className="text-center py-20 bg-white rounded-3xl border border-t border-l border-r border-black border-b-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishes.map((wish) => (
            <WishCard key={wish.id} wish={wish} onDetails={handleViewDetails} />
          ))}
        </div>
      )}
      {isAddModalOpen && <WishForm onClose={() => setIsAddModalOpen(false)} />}
      {isEditModalOpen && selectedWish && (
        <WishForm
          selectedWish={selectedWish}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedWish(null);
          }}
        />
      )}
      {isDeleteModalOpen && selectedWish && (
        <DeleteWishForm
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedWish(null);
          }}
          selectedWish={selectedWish}
        />
      )}
    </main>
  );
}

export default Dashboard;