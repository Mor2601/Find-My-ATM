import { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { ATM,RequestBody } from '../types';


interface UseFetchResult {
    data: ATM[] | null;
    error: string | null;
    loading: boolean;
    queryHaveCity: boolean;
  }
/**
 * Custom hook to fetch ATMS from the API base on the request body
 *
 * @param request 
 * @returns 
 */
const useFetch = (request: Partial<RequestBody>): UseFetchResult => {
    const [data, setData] = useState<ATM[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [queryHaveCity, setQueryHaveCity] = useState<boolean>(false);

  useEffect(() => {
    
    
    const fetchDataAsync = async () => {
      try {  
        setLoading(true);    
        const result = await fetchData(request);
        setData(result as ATM[]);
        if (request.q && request.q!=="") {
          
          setQueryHaveCity(true);
        } else {
          setQueryHaveCity(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
      
    fetchDataAsync();
  
  }, [request]);

  return { data, error, loading, queryHaveCity };
};

export default useFetch;