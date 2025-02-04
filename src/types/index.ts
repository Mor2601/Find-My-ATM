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
    ATM_Type?: string;
    Bank_Name?:string[];
  }

  export interface RequestBody {
    resource_id: string;
    q?: string;
    limit?: number;
    offset?: number;
    filters?: FilterOptions;
  }
