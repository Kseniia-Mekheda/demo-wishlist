import { useState, useEffect } from "react";
import useAppContext from "~/hooks/useAppContext";
import type { WishFormProps } from "~/types/common/interfaces";
import { IMAGE_PLACEHOLDER } from "~/constants/const";

const WishForm = ({ onClose, selectedWish }: WishFormProps) => {
  const isEditMode = Boolean(selectedWish);
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    description: '',
    price: 0
  });

  const { loading, addWish, updateWish } = useAppContext();

  useEffect(() => {
    if (selectedWish) {
      setFormData({
        imageUrl: selectedWish.imageUrl || '',
        title: selectedWish.title || '',
        description: selectedWish.description || '',
        price: selectedWish.price || 0
      })
    }
  }, [selectedWish]);

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
        lastUpdated: new Date(),
      });
    } else {
      await addWish({ ...formData, dateAdded: new Date() });
    }
    
    onClose();
  }

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">
            {isEditMode ? "Edit Wish" : "Add New Wish"}
          </h2>
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center me-5 mb-10">
              <img
                src={formData.imageUrl || IMAGE_PLACEHOLDER}
                alt="Preview"
                className="w-auto h-auto object-contain rounded-lg shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = IMAGE_PLACEHOLDER;
                }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wish Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter wish title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="Enter wish description"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
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