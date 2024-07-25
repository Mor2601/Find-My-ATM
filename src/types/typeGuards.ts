import { ATM, FilterOptions, SearchQuery, MapBounds } from ".";

export const isATM = (record: any): record is ATM => {
  return (
    record.hasOwnProperty('ATM_Address') &&
    record.hasOwnProperty('ATM_Address_Extra') &&
    record.hasOwnProperty('ATM_Location') &&
    record.hasOwnProperty('ATM_Type') &&
    record.hasOwnProperty('Atm_Num') &&
    record.hasOwnProperty('Bank_Code') &&
    record.hasOwnProperty('Bank_Name') &&
    record.hasOwnProperty('Branch_Code') &&
    record.hasOwnProperty('City') &&
    record.hasOwnProperty('Commission') &&
    record.hasOwnProperty('Handicap_Access') &&
    record.hasOwnProperty('X_Coordinate') &&
    record.hasOwnProperty('Y_Coordinate') &&
    record.hasOwnProperty('_id')
  );
};
  
  export function isFilterOptions(obj: any): obj is FilterOptions {
    return typeof obj === 'object' &&
      Array.isArray(obj.atmTypes) &&
      obj.atmTypes.every((type: string) => ['משיכת מזומן', 'מכשיר מידע/ואו מתן הוראות'].includes(type)) &&
      Array.isArray(obj.bankNames) &&
      obj.bankNames.every((name: string) => typeof name === 'string');
  }
  
  export function isSearchQuery(obj: any): obj is SearchQuery {
    return typeof obj === 'object' &&
      typeof obj.cityName === 'string' &&
      (obj.atmType === undefined || ['משיכת מזומן', 'מכשיר מידע/ואו מתן הוראות'].includes(obj.atmType)) &&
      (obj.bankName === undefined || typeof obj.bankName === 'string');
  }
  
  export function isGeolocation(obj: any): obj is Geolocation {
    return typeof obj === 'object' &&
      typeof obj.latitude === 'number' &&
      typeof obj.longitude === 'number';
  }
  
  export function isMapBounds(obj: any): obj is MapBounds {
    return typeof obj === 'object' &&
      isGeolocation(obj.northEast) &&
      isGeolocation(obj.southWest);
  }
  export const isValidUrl = (url: any): url is string => {
    try {
      new URL(url); // Try creating a URL object
      return typeof url === 'string' && url.trim().length > 0;
    } catch {
      return false;
    }
  };