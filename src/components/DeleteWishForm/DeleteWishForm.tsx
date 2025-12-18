import type { WishFormProps } from "~/types/common/interfaces";
import useAppContext from "~/hooks/useAppContext";

const DeleteModal = ({ onClose, selectedWish }: WishFormProps) => {
  const { id, title } = selectedWish || { id: '', title: '' };
  const { deleteWish } = useAppContext();

  const handleConfirmDelete = async () => {
    if (!id) return;
  
    await deleteWish(id);
    onClose();
  }

  if (!selectedWish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Delete wish?
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete your wish <span className="font-medium">"{title}"</span>?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
