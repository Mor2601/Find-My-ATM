import { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import { ATM } from '../types';
import { isValidUrl } from '../types/typeGuards';

interface UseFetchResult {
    data: ATM[] | null;
    error: string | null;
    loading: boolean;
  }
/**

 * @param request 
 * @returns {ATM[]} - Array ATMS.
 */
const useFetch = (request: string): UseFetchResult => {
    const [data, setData] = useState<ATM[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
   
    // if(isValidUrl(request)){
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData(request);
        
        console.log(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    // };
  

    fetchDataAsync();
  }
  }, []);

  return { data, error, loading };
};

export default useFetch;