export const IMAGE_PLACEHOLDER = "https://placehold.co/600x400?text=No+Image&font=montserrat";

export const FILTERS = {
  byDate: {
    label: 'Date Added',
    options: [
      { value: 'newest', label: 'Newest' },
      { value: 'oldest', label: 'Oldest' },
    ]
  }, 
  byPrice: {
    label: 'Price',
    options: [
      { value: 'lowToHigh', label: 'Low to High' },
      { value: 'highToLow', label: 'High to Low' },
    ]
  },
}