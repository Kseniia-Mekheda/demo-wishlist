import { useState } from 'react';
import type { useApiInterface } from '~/types/hooks/use-api-interface';
import type { HTTPMethod } from '~/types/common/types';

const useApi = () : useApiInterface => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resetError = () => {
    setError(null);
  }

  const request = async<T>(
  	url: string, 
    method: HTTPMethod = 'GET', 
    body: any = null,
    headers: HeadersInit = {}
  ): Promise<T> => {
		setLoading(true);
		setError(null);
    try {
      if (body) {
        body = JSON.stringify(body);
        headers = {
          ...headers,
          "Content-Type": "application/json",
        };
      }

			const response = await fetch(url, { method, body, headers }); 
			if (!response.ok) {
				throw new Error(`Error: could not fetch ${url}, status: ${response.status}`);
			}
			const data = await response.json().catch(() => ({})); 
			setLoading(false);
			return data as T; 
		} catch (e) {
			setLoading(false);
			const errorMsg = e instanceof Error ? e.message : 'Unknown error';
			setError(errorMsg);
			throw e;
		}
	}
	return { request, loading, error, resetError}
}

export default useApi;