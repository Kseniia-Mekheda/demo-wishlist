import type { Wish } from "~/types/common/interfaces";

export interface AppContextInterface {
  wishes: Wish[], 
  currentWish: Wish | null,
  totalPages: number,
  error: string | null, 
  loading: boolean, 
  fetchWishes: (dateFilter?: string, priceFilter?: string, page?: number) => Promise<void>,
  fetchWishById: (id: string) => Promise<Wish | null>,
  addWish: (wish: Omit<Wish, 'id'>, dateFilter?: string, priceFilter?: string, page?: number) => Promise<void>,
  updateWish: (id: string, updatedWish: Partial<Omit<Wish, 'id'>>) => Promise<void>, 
  deleteWish: (id: string, dateFilter?: string, priceFilter?: string, page?: number) => Promise<void>
}