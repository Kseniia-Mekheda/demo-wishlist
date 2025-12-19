import { useState } from "react";
import useAppContext from "~/hooks/useAppContext";
import type { WishFormProps } from "~/types/common/interfaces";
import { DEFAULT_FILTERS, IMAGE_PLACEHOLDER, PAGINATION } from "~/constants/const";
import { styles } from "~/constants/styles";
import { getDateOnly } from "~/utilities/format-date";
import { useSearchParams } from "react-router-dom";

const WishForm = ({ onClose, selectedWish }: WishFormProps) => {
  const isEditMode = Boolean(selectedWish);
  const [searchParams] = useSearchParams();

  const dateFilter = searchParams.get("date") || DEFAULT_FILTERS.date;
  const priceFilter = searchParams.get("price") || DEFAULT_FILTERS.price;
  const currentPage = Number(searchParams.get("page")) || PAGINATION.defaultPage;
  const [formData, setFormData] = useState({
    imageUrl: selectedWish?.imageUrl || '',
    title: selectedWish?.title || '',
    description: selectedWish?.description || '',
    price: selectedWish?.price || 0,
  });

  const { loading, addWish, updateWish } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target; 
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (isEditMode && selectedWish) {
      await updateWish(selectedWish.id, {
        ...formData,
        lastUpdated: getDateOnly(),
      });
    } else {
      await addWish(
        { ...formData, dateAdded: getDateOnly() },
        dateFilter,
        priceFilter,
        currentPage
      );
    }
    onClose();
  }

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div
          className={`${styles.card} shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto`}
        >
          <h2 className={`text-2xl mb-4 text-center ${styles.header}`}>
            {isEditMode ? "Edit Wish" : "Add New Wish"}
          </h2>
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center me-5 mb-10">
              <img
                src={formData.imageUrl || IMAGE_PLACEHOLDER}
                alt="Preview"
                className="w-auto h-auto object-cover aspect-square rounded-lg shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = IMAGE_PLACEHOLDER;
                }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-md mb-1">Wish Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={styles.textInput}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={styles.textInput}
                />
              </div>
              <div className="mb-4">
                <label className="block text-md mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={styles.textInput}
                  min="0"
                  step="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.textInput}
                  rows={3}
                ></textarea>
              </div>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${styles.ctaButton} w-full`}
                >
                  {loading
                    ? "Saving..."
                    : isEditMode
                    ? "Save Changes"
                    : "Add Wish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishForm;