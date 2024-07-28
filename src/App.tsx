import React, { useEffect, useState, useCallback, useRef } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { SelectChangeEvent } from "@mui/material/Select";
import { fetchData } from "./services/api";
import { ATM, FilterOptions } from "./types";
import Search from "./components/Search/Search";
import Filters from "./components/Filters/Filters";
import ATMList from "./components/ATMList/ATMList";
import useDebounce from "./hooks/useDebounce";
import Map from "./components/Map/Map";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

const PAGE_SIZE = 50;

export default function App() {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [atmForAtmList, setAtmForAtmList] = useState<ATM[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedBankType, setSelectedBankType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const [atm, setAtm] = useState<ATM | null>(null);
  const [isQueryHaveCity, setIsQueryHaveCity] = useState<boolean>(false);
  const paperRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(search, 500);

  const fetchMapAndATMListData = useCallback(async () => {
    paperRef.current?.scrollTo(0, 0);
    setLoading(true);
    try {
      const filters: Partial<FilterOptions> = {};
      if (selectedBankType && selectedBankType !== "כל סוגי הבנקטים") {
        filters.ATM_Type = selectedBankType;
      }
      if (selectedBank && selectedBank !== "כל הבנקים") {
        filters.Bank_Name = [selectedBank];
      }

      const data = await fetchData(
        debouncedSearch,
        undefined,
        undefined,
        Object.keys(filters).length ? filters : undefined,
        "fetchMapAndATMListData"
      );
      setAtms(data);
      setAtmForAtmList(data.slice(0, PAGE_SIZE));
      setHasMore(data.length > PAGE_SIZE);
      setHasPrevious(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedBank, selectedBankType]);

  useEffect(() => {
    if(debouncedSearch.length>0){
      setIsQueryHaveCity(true);
    }else{
      setIsQueryHaveCity(false);
    }
    fetchMapAndATMListData();
  }, [debouncedSearch, selectedBank, selectedBankType]);

  const fetchMoreData = useCallback(() => {
    setLoading(true);
    setAtmForAtmList((prevData) => {
      const nextPageData = atms.slice(
        prevData.length,
        prevData.length + PAGE_SIZE
      );
      if (nextPageData.length < PAGE_SIZE) setHasMore(false);
      setLoading(false);
      return [...prevData, ...nextPageData];
    });
  }, [atms]);

  const fetchPreviousData = useCallback(() => {
    setLoading(true);
    setAtmForAtmList((prevData) => {
      const previousPageStart = Math.max(prevData.length - PAGE_SIZE * 2, 0);
      const previousPageData = atms.slice(
        previousPageStart,
        prevData.length - PAGE_SIZE
      );
      if (previousPageStart === 0) setHasPrevious(false);
      setLoading(false);
      return [...previousPageData, ...prevData];
    });
  }, [atms]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchMoreData();
    }
    if (scrollTop === 0 && hasPrevious && !loading) {
      fetchPreviousData();
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
   
  };

  const handleBankChange = (event: SelectChangeEvent) => {
    setSelectedBank(event.target.value);
  };

  const handleBankTypeChange = (event: SelectChangeEvent) => {
    setSelectedBankType(event.target.value);
  };

  const handleAtmClick = (atm: ATM) => {
    setAtm(atm);
  };

  return (
   (
    atms.length
   ?  <Grid container spacing={2} sx={{ flex: 1 }}>
         <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
           {atms.length > 0 ? (
             <Map
               atmsList={atms}
               atm={atm}
               setAtm={setAtm}
               isCityFouced={isQueryHaveCity}
               
             />
           ) : null}
         </Grid>
         <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
           <Grid container direction="column" spacing={2}>
             <Grid item>
               <Search handleSearch={handleSearch} search={search} />
             </Grid>
             <Grid item>
               <Grid container spacing={2}>
                 <Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
                   <Filters
                     label="כל סוגי הבנקטים"
                     labelId="status-select-bank-type"
                     id="select-bank-type"
                     selectedOption={selectedBankType?selectedBankType:"כל סוגי הבנקטים"}
                     selectionOptions={[
                       "משיכת מזומן",
                       "מכשיר מידע/או מתן הוראות",
                       "כל סוגי הבנקטים",
                     ]}
                     onSelectionChange={handleBankTypeChange}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6} md={12} lg={6} xl={6}>
                   <Filters
                     label="כל הבנקים"
                     labelId="status-select-bank-name"
                     id="select-bank-name"
                     selectedOption={selectedBank?selectedBank:"כל הבנקים"}
                     selectionOptions={[
                       'בנק אוצר החייל בע"מ',
                       'בנק דיסקונט לישראל בע"מ',
                       'בנק הבינלאומי הראשון לישראל בע"מ',
                       'בנק הפועלים בע"מ',
                       "כל הבנקים",
                     ]}
                     onSelectionChange={handleBankChange}
                   />
                 </Grid>
               </Grid>
             </Grid>
             <Divider />
             <Grid
               item
               sx={{ height: "calc(100vh - 150px)", overflowY: "auto" }}
               onScroll={handleScroll}
                ref={paperRef}
             >
               <Paper>
                 <ATMList atms={atmForAtmList} handleAtmClick={handleAtmClick} />
               </Paper>
             </Grid>
           </Grid>
         </Grid>
       </Grid>
   :<Box sx={{ height:"100vh", display: 'flex', alignItems: 'center',justifyContent:"center"}}> <CircularProgress sx={{color:"#1976d2"}}/></Box>
   )
  );
}
