import React, { createContext, useState, ReactNode } from 'react';
import { ATM } from '../types';
import useDebounce from '../hooks/useDebounce';

interface StateContextProps {
  atms: ATM[];
  setAtms: React.Dispatch<React.SetStateAction<ATM[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedBank: string;
  setSelectedBank: React.Dispatch<React.SetStateAction<string>>;
  selectedBankType: string;
  setSelectedBankType: React.Dispatch<React.SetStateAction<string>>;
  atm: ATM | null;
  setAtm: React.Dispatch<React.SetStateAction<ATM | null>>;
  isQueryHaveCity: boolean;
  setIsQueryHaveCity: React.Dispatch<React.SetStateAction<boolean>>;
    debouncedSearch: string;
}
/**
 * Context Manager to manage the state of the application 
 * this Manager will use the React Context API to share the state and update them between components
 */
export const StateContext = createContext<StateContextProps | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch=useDebounce(search,500);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedBankType, setSelectedBankType] = useState<string>("");
  const [atm, setAtm] = useState<ATM | null>(null);
  const [isQueryHaveCity, setIsQueryHaveCity] = useState<boolean>(false);

  return (
    <StateContext.Provider value={{ 
      atms, setAtms, 
      search, setSearch, 
      selectedBank, setSelectedBank, 
      selectedBankType, setSelectedBankType, 
      atm, setAtm, 
      isQueryHaveCity, setIsQueryHaveCity ,
      debouncedSearch
    }}>
      {children}
    </StateContext.Provider>
  );
};
