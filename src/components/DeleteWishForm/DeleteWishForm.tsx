import type { WishFormProps } from "~/types/common/interfaces";
import useAppContext from "~/hooks/useAppContext";
import { styles } from "~/constants/styles";

const DeleteModal = ({ onClose, onAfterDelete, selectedWish }: WishFormProps) => {
  const { id, title } = selectedWish || { id: '', title: '' };
  const { deleteWish } = useAppContext();

  const handleConfirmDelete = async () => {
    if (!id) return;
  
    await deleteWish(id);
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
