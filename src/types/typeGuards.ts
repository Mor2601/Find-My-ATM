import { ATM} from ".";
/**
 * Check if the record is an ATM according to ATM ATTRIBUTES
 * @param record 
 * @returns 
 */
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

