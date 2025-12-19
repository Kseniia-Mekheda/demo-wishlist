import type { WishFormProps } from "~/types/common/interfaces";
import useAppContext from "~/hooks/useAppContext";
import { styles } from "~/constants/styles";
import { DEFAULT_FILTERS, PAGINATION } from "~/constants/const";
import { useSearchParams } from "react-router-dom";

const DeleteModal = ({ onClose, onAfterDelete, selectedWish }: WishFormProps) => {
  const { id, title } = selectedWish || { id: '', title: '' };
  const [searchParams] = useSearchParams();

  const dateFilter = searchParams.get("date") || DEFAULT_FILTERS.date;
  const priceFilter = searchParams.get("price") || DEFAULT_FILTERS.price;
  const currentPage = Number(searchParams.get("page")) || PAGINATION.defaultPage;
  const { deleteWish } = useAppContext();

  const handleConfirmDelete = async () => {
    if (!id) return;
  
    await deleteWish(id, dateFilter, priceFilter, currentPage);
    onClose();
    onAfterDelete?.();
  }

  if (!selectedWish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`${styles.card} rounded-xl p-6 w-full max-w-sm shadow-xl`}>
        <h3 className={`text-2xl mb-2 ${styles.header}`}>
          Delete wish?
        </h3>
        <p className="text-lg mb-6">
          Are you sure you want to delete your wish <span className="font-medium">"{title}"</span>?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
