import type { notificationType } from "../common/types";

export interface Wish{
  id: string,
  imageUrl?: string, 
  title: string,
  description?: string,
  price: number, 
  dateAdded: string,
  lastUpdated?: string,
};

export interface NotificationInterface {
  message: string,
  type: notificationType,
  onClose?: () => void,
};

export interface WishCardProps {
  wish: Wish, 
  onDetails: (id: string) => void,
};

export interface WishFormProps {
  onClose: () => void,
  onAfterDelete?: () => void,
  selectedWish?: Wish,
}

export interface FilterOption {
  label: string, 
  value: string,
}

export interface SelectFilterProps {
  label: string, 
  value: string, 
  options: FilterOption[], 
  onChange: (value: string) => void,
}

export interface WishFilterProps {
  dateFilter: string, 
  priceFilter: string, 
  onDateFilterChange: (value: string) => void,
  onPriceFilterChange: (value: string) => void,
} 

export interface WishActionsProps {
  wish: Wish,
  variant?: "card" | "page",
  onAfterDelete?: () => void,
}

export interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
}