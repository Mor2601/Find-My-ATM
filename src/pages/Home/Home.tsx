import React, { useState, useContext } from "react";
import { Grid, Divider, SelectChangeEvent } from "@mui/material";
import { BANKS_TYPES, BANKS_NAMES } from "../../constants/constants";
import { ATM } from "../../types";
import Search from "../../components/Search/Search";
import Filters from "../../components/Filters/Filters";
import ATMList from "../../components/ATMList/ATMList";
import Map from "../../components/Map/Map";
import { StateContext } from "../../components/Context/StateContext";
import NoResult from "../../components/NoResult/NoResult";
const Home: React.FC = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('StateContext must be used within a StateProvider');
  }
  const {
    atms, setSelectedBank, setSelectedBankType,
    selectedBank, selectedBankType
    
  } = context;
  const [selectedAtm, setSelectedAtm] = useState<ATM | null>(null);

/**
 * Update the selected bank name Context
 * @param event 
 */
  const handleBankChange = (event: SelectChangeEvent) => {
  
    setSelectedBank(event.target.value);
  };
/**
 * Update the selected bank type Context 
 * @param event 
 */
  const handleBankTypeChange = (event: SelectChangeEvent) => {
    
    setSelectedBankType(event.target.value);
  };

  /**
   * Update the selected ATM when it was clicked from ATMS list
   * @param atm 
   */
  const handleAtmClick = (atm: ATM) => {
    setSelectedAtm(atm);
  };
  return (
    
     <Grid container spacing={2} sx={{ flex: 1 }}>
      
      <Grid item xs={12} md={8} sx={{ height: { xs: "50vh", md: "100vh" }, width: "100%" }}>
        {atms.length > 0 ? (
          <Map
            atmsList={atms}
            selectedAtm={selectedAtm}
            setSelectedAtm={setSelectedAtm}
          />
        ) : (
          <NoResult />
        )}
      </Grid>

     
      <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Filters
            labelId="status-select-bank-type"
            id="select-bank-type"
            selectedOption={
              selectedBankType ? selectedBankType : "כל סוגי הבנקטים"
            }
            selectionOptions={BANKS_TYPES}
            onSelectionChange={handleBankTypeChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Filters
                  labelId="status-select-bank-name"
                  id="select-bank-name"
                  selectedOption={selectedBank ? selectedBank : "כל הבנקים"}
                  selectionOptions={BANKS_NAMES}
                  onSelectionChange={handleBankChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <ATMList atms={atms} handleAtmClick={handleAtmClick} />
        </Grid>
      </Grid>
    </Grid>
   
  );
};

export default Home;
