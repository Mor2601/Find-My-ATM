import { ATM } from '../types';
import { isATM } from '../types/typeGuards';
/**
 * fetch all the ATMS from the API
 */
export const fetchData = async (request: string): Promise<ATM[]> => {
    console.log(request);
    try {
      const response = await fetch("/api/3/action/datastore_search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource_id: "b9d690de-0a9c-45ef-9ced-3e5957776b26",
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Network response was not ok - Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.result.records.every((record: any) => isATM(record))) {
        return data.result.records as ATM[];
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };