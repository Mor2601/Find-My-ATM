import { ATM, FilterOptions, RequestBody } from '../types';
import { isATM } from '../types/typeGuards';

const defaultBankNames = [
  "בנק אוצר החייל בע\"מ",
  "בנק דיסקונט לישראל בע\"מ",
  "בנק הבינלאומי הראשון לישראל בע\"מ",
  "בנק הפועלים בע\"מ"
];

/**
 * fetch all the ATMs from the API
 */
export const fetchData = async (
  q?: string,
  limit?: number,
  offset?: number,
  filters?: Partial<FilterOptions>,
  name?: string
): Promise<ATM[]> => {
  const time = new Date().getTime();
  const resource_id = "b9d690de-0a9c-45ef-9ced-3e5957776b26";
  const requestBody: RequestBody = { resource_id };

  if (q) requestBody.q = q;
  if (limit !== undefined) requestBody.limit = limit;
  if (offset !== undefined) requestBody.offset = offset;

  if (filters) {
    const validFilters: Partial<FilterOptions> = {};
    if (filters.ATM_Type) validFilters.ATM_Type = filters.ATM_Type;
    if (filters.Bank_Name) {
      validFilters.Bank_Name = filters.Bank_Name;
    } else {
      validFilters.Bank_Name = defaultBankNames;
    }

    requestBody.filters = validFilters as FilterOptions;
  } else {
    requestBody.filters = { Bank_Name: defaultBankNames };
  }

  try {
    const response = await fetch("/api/3/action/datastore_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log(`fetchData for ${name} took: ${new Date().getTime() - time}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok - Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.result.records.every((record: any) => isATM(record))) {
      return filterDuplicateAtms(data.result.records as ATM[]);
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

/**
 * Filter out duplicate ATMs based on the same coordinates and bank name.
 */
const filterDuplicateAtms = (atms: ATM[]): ATM[] => {
  const seen = new Set<string>();
  return atms.filter((atm) => {
    const key = `${atm.X_Coordinate}-${atm.Y_Coordinate}-${atm.Bank_Name}-${atm.ATM_Type}`;
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
};
