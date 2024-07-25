export interface ATM {
    ATM_Address: string;
    ATM_Address_Extra: string;
    ATM_Location: string;
    ATM_Type: string;
    Atm_Num: number;
    Bank_Code: number;
    Bank_Name: string;
    Branch_Code: number;
    City: string;
    Commission: string;
    Handicap_Access: string;
    X_Coordinate: number;
    Y_Coordinate: number;
    _id: number;
  }
  

  export interface FilterOptions {
    atmTypes: Array<'משיכת מזומן' | 'מכשיר מידע/ואו מתן הוראות'>;
    bankNames: Array<string>;
  }
  

  export interface SearchQuery {
    cityName: string; // City name in Hebrew
    atmType?: 'משיכת מזומן' | 'מכשיר מידע/ואו מתן הוראות'; // Optional
    bankName?: string; // Optional
  }
  
 
  export interface Geolocation {
    latitude: number;
    longitude: number;
  }
  
  
  export interface MapBounds {
    northEast: Geolocation;
    southWest: Geolocation;
  }