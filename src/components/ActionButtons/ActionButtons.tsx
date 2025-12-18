import { useState } from "react";
import WishForm from "../WishForm/WishForm";
import DeleteWishForm from "../DeleteWishForm/DeleteWishForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { WishActionsProps } from "~/types/common/interfaces";

const ActionButtons = ({
  wish,
  variant = "card",
  onAfterDelete,
}: WishActionsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isPageVariant = variant === "page";

  const editButtonClasses = isPageVariant
    ? "flex w-full justify-center items-center gap-2 px-4 py-2.5 bg-[#D4D4FA] border-t border-l border-r border-black border-b-4 text-black text-md rounded-3xl active:scale-95 transition-all"
    : "flex items-center justify-center p-2.5 rounded-3xl border text-black-500 hover:bg-[#1C1E87] hover:text-white hover:border-[#1C1E87] active:scale-95 transition-all";

  const deleteButtonClasses = isPageVariant
    ? "flex w-full justify-center items-center gap-2 px-4 py-2.5 bg-red-400 border-t border-l border-r border-black border-b-4 text-black text-md rounded-3xl border-2 hover:bg-red-300 active:scale-95 transition-all"
    : "flex items-center justify-center p-2.5 rounded-3xl border border-red text-red-500 hover:bg-red-500 hover:text-white hover:border-red-200 active:scale-95 transition-all";

  const containerClasses = isPageVariant ? "flex gap-4 w-full" : "flex gap-2";

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
    onAfterDelete?.();
  };

  return (
    <>
      <div className={containerClasses}>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className={editButtonClasses}
          aria-label="Edit wish"
        >
          <PencilSquareIcon className="w-5 h-5" />
          {isPageVariant && <span>Edit</span>}
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className={deleteButtonClasses}
          aria-label="Delete wish"
        >
          <TrashIcon className="w-5 h-5" />
          {isPageVariant && <span>Delete</span>}
        </button>
      </div>
      {isEditModalOpen && (
        <WishForm
          selectedWish={wish}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteWishForm selectedWish={wish} onClose={handleDeleteClose} />
      )}
    </>
  );
};

export default ActionButtons;
