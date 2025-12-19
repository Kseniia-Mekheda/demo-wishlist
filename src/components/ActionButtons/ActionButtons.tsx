import { useState } from "react";
import WishForm from "../WishForm/WishForm";
import DeleteWishForm from "../DeleteWishForm/DeleteWishForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { WishActionsProps } from "~/types/common/interfaces";
import { styles } from "~/constants/styles"

const ActionButtons = ({
  wish,
  variant = "card",
  onAfterDelete,
}: WishActionsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isPageVariant = variant === "page";

  const editButtonClasses = isPageVariant
    ? styles.actionBtnPage.edit
    : styles.actionBtnCard.edit;

  const deleteButtonClasses = isPageVariant
    ? styles.actionBtnPage.delete
    : styles.actionBtnCard.delete;
   
  const containerClasses = isPageVariant ? "flex gap-4 w-full" : "flex gap-2";

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
        <DeleteWishForm
          selectedWish={wish} 
          onAfterDelete={onAfterDelete} 
          onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </>
  );
};

export default ActionButtons;
