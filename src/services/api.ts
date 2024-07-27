import { ATM, FilterOptions, RequestBody } from '../types';
import { isATM } from '../types/typeGuards';

/**
 * fetch all the ATMs from the API
 */
export const fetchData = async (
  q?: string,
  limit?: number,
  offset?: number,
  filters?: Partial<FilterOptions>
): Promise<ATM[]> => {
  const resource_id = "b9d690de-0a9c-45ef-9ced-3e5957776b26";
  const requestBody: RequestBody = { resource_id };

  if (q) requestBody.q = q;
  if (limit !== undefined) requestBody.limit = limit;
  if (offset !== undefined) requestBody.offset = offset;
  
  if (filters) {
    const validFilters: Partial<FilterOptions> = {};
    if (filters.ATM_Type) validFilters.ATM_Type = filters.ATM_Type;
    if (filters.Bank_Name) validFilters.Bank_Name = filters.Bank_Name;
    if (Object.keys(validFilters).length > 0) requestBody.filters = validFilters as FilterOptions;
  }
  console.log(requestBody);
  try {
    const response = await fetch("/api/3/action/datastore_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok - Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    if (data.result.records.every((record: any) => isATM(record))) {
      return data.result.records as ATM[];
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};
