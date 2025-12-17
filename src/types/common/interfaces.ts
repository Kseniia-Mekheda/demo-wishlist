import type { notificationType } from "../common/types";

export interface Wish{
  id: string,
  imageUrl?: string, 
  title: string,
  description?: string,
  price: number, 
  dateAdded: Date,
};

export interface NotificationInterface {
  message: string;
  type: notificationType;
  onClose?: () => void;
};