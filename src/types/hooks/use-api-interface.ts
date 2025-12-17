import type { HTTPMethod } from "~/types/common/types";

export interface useApiInterface {
  request: <T>(
    url: string, 
    method: HTTPMethod, 
    body?: any,
    headers?: HeadersInit
  ) => Promise<T>,
  loading: boolean,
  error: string | null, 
  resetError: () => void
}