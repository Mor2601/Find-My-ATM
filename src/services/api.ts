import { ATM, FilterOptions, RequestBody } from "../types";
import { isATM } from "../types/typeGuards";
import { BANKS_NAMES } from "../constants/constants";

/**
 * Create the body for the request to the API
 * @param body 
 * @returns only the feild that been specified
 */
const createBody = (body: Partial<RequestBody>): RequestBody => {
  const validFilters: Partial<FilterOptions> = {};
  const bodyRequest: RequestBody = { resource_id: "b9d690de-0a9c-45ef-9ced-3e5957776b26" };
  if (body.q) bodyRequest.q = body.q;
  if (body.limit!==undefined) bodyRequest.limit = body.limit;
  if (body.offset!==undefined) bodyRequest.offset = body.offset;
  if (body.filters) {
    if (body.filters.ATM_Type && body.filters.ATM_Type !== "כל סוגי הבנקטים") {
      validFilters.ATM_Type = body.filters.ATM_Type;
    }
    if (
      body.filters.Bank_Name &&
      !body.filters.Bank_Name.includes("כל הבנקים") && !body.filters.Bank_Name.includes("")
    ) {
      validFilters.Bank_Name = body.filters.Bank_Name;
    } else {
      validFilters.Bank_Name = BANKS_NAMES;
    }
  } else {
    validFilters.Bank_Name = BANKS_NAMES;
  }
  bodyRequest.filters = validFilters as FilterOptions;
  return bodyRequest;
  
 
};

/**
 * Fetch ATMS from the API
 * @param body 
 * @returns {ATM[]}
 */
export const fetchData = async (body: Partial<RequestBody>): Promise<ATM[]> => {
 
  
  const requestBody=createBody(body);
  
  try {
    const response = await fetch("/api/3/action/datastore_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    

    if (!response.ok) {
      throw new Error(
        `Network response was not ok - Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.result.records.every((record: any) => isATM(record))) {
      const uniqueAtms = filterDuplicateAtms(data.result.records as ATM[], body.q);
      return uniqueAtms
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

/**
 * Filter duplicate ATMs.
 * If there is ATMS with the same coordinates, bank name and ATM type, only one of them will be shown.
 * it will return only the ATMs that include the q value in the City attribute
 * @param atms 
 * @param q 
 * @returns {ATM[]}
 */
const filterDuplicateAtms = (atms: ATM[], q?: string): ATM[] => {
  const seen = new Set<string>();
  

  const filteredATMs = atms.filter((atm) => {
    const key = `${atm.X_Coordinate}-${atm.Y_Coordinate}-${atm.Bank_Name}-${atm.ATM_Type}`;
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      // Check if City attribute includes part of the q value
      if (!q || (atm.City && atm.City.includes(q))) {
        
        return true;
      }
      return false;
    }
  });

  return filteredATMs;
};