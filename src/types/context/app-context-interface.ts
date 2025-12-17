import type { Wish } from "~/types/common/interfaces";

export interface AppContextInterface {
  wishes: Wish[], 
  error: string | null, 
  loading: boolean, 
  fetchWishes: () => Promise<void>,
  addWish: (wish: Omit<Wish, 'id'>) => Promise<void>,
  updateWish: (id: string, updatedWish: Partial<Omit<Wish, 'id'>>) => Promise<void>, 
  deleteWish: (id: string) => Promise<void>
}