export const IMAGE_PLACEHOLDER = "https://placehold.co/600x400/e5e5fc/D4D4FA/?text=No+Image&font=montserrat";

export const FILTERS = {
  byDate: {
    label: 'Date Added',
    param: 'date',
    options: [
      { value: 'newest', label: 'Newest' },
      { value: 'oldest', label: 'Oldest' },
    ]
  }, 
  byPrice: {
    label: 'Price',
    param: 'price',
    options: [
      { value: 'lowToHigh', label: 'Low to High' },
      { value: 'highToLow', label: 'High to Low' },
    ]
  },
}

export const DEFAULT_FILTERS = {
  date: 'newest',
  price: 'highToLow',
};

export const PAGINATION = {
  defaultPage: 1,
  itemsPerPage: 6,
};