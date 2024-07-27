import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { SelectChangeEvent } from "@mui/material/Select";
import { fetchData } from "./services/api";
import { ATM,FilterOptions } from "./types";
import Search from "./components/Search/Search";
import Filters from "./components/Filters/Filters";
import ATMList from "./components/ATMList/ATMList";
import useDebounce from "./hooks/useDebounce";
import Map from "./components/Map/Map";

const PAGE_SIZE = 100;

export default function App() {
  const [atms, setAtms] = useState<ATM[]>([]);
  const [selectedAtms, setSelectedAtms] = useState<ATM[]>([]);
  const [atmForAtmList, setAtmForAtmList] = useState<ATM[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [selectedBankType, setSelectedBankType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there's more data to load
  const [hasPrevious, setHasPrevious] = useState<boolean>(false); // Track if there's previous data to load
  const [offset, setOffset] = useState<number>(0);
  
  const debouncedSearch = useDebounce(search, 500);

  const fetchMapData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchData();
      setAtms(data);
      setSelectedAtms(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchATMListData = useCallback(async (newOffset: number, isAppending: boolean) => {
    setLoading(true);
    try {
      const data = await fetchData("", PAGE_SIZE, newOffset);
      if (data.length < PAGE_SIZE) {
        setHasMore(false); // No more data to load
      }
      if (isAppending) {
        setAtmForAtmList((prevData) => [...prevData, ...data]);
      } else {
        setAtmForAtmList((prevData) => [...data, ...prevData]); // Insert data at the top
      }
      setOffset(newOffset);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMapData(); // Fetch initial map data
    fetchATMListData(0, true); // Fetch initial ATM list data
  }, [fetchMapData, fetchATMListData]);

  const fetchMoreData = useCallback(async (newOffset: number, isAppending: boolean) => {
    await fetchATMListData(newOffset, isAppending);
  }, [fetchATMListData]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    // Fetch more data when scrolling to the bottom
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading) {
      fetchMoreData(offset + PAGE_SIZE, true);
    }

    // Fetch previous data when scrolling to the top
    if (scrollTop <= 10 && hasPrevious && !loading) {
      fetchMoreData(offset - PAGE_SIZE, false);
    }
  };

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);
      try {
        // Build the filters object
        const filters: Partial<FilterOptions> = {};
        if (selectedBankType && selectedBankType !== 'כל סוגי הבנקטים') {
          
          filters.ATM_Type = selectedBankType;
        }
        if (selectedBank && selectedBank !== 'כל הבנקים') {
          filters.Bank_Name = selectedBank;
        }
  
        // Fetch map data based on filters
        const mapData = await fetchData(debouncedSearch,undefined,undefined,Object.keys(filters).length ? filters : undefined);
        console.log(mapData);
        setAtms(mapData);
        setSelectedAtms(mapData);
  
        // Fetch the first 100 ATMs for the list
        const atmListData = await fetchData(debouncedSearch, 100, undefined, Object.keys(filters).length ? filters : undefined);
        setAtmForAtmList(atmListData);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Check if any filter or search criteria are specified
    const shouldFetchFilteredData = debouncedSearch || selectedBank !== 'כל הבנקים' || selectedBankType !== 'כל סוגי הבנקטים';
  
    if (shouldFetchFilteredData) {
      fetchFilteredData();
    } else {
      // Reset to all ATMs if no filters are applied
      fetchMapData(); // Fetch all map data
      fetchATMListData(0, true); // Fetch first 100 ATMs for the list
    }
  }, [debouncedSearch, selectedBank, selectedBankType, fetchMapData, fetchATMListData]);
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleBankChange = (event: SelectChangeEvent) => {
    setSelectedBank(event.target.value);
  };

  const handleBankTypeChange = (event: SelectChangeEvent) => {
    setSelectedBankType(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ flex: 1 }}>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        {atms.length > 0 ? <Map atmsList={atms} /> : null}
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
                  selectedOption={selectedBankType}
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
                  labelId="status-select-bank"
                  id="select-bank"
                  selectedOption={selectedBank}
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
          <Grid item>
            <Divider variant="middle" sx={{ borderColor: "black" }} />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Paper
              sx={{
                height: "100%",
                maxHeight: {
                  xs: "60vh",
                  sm: "65vh",
                  md: "70vh",
                  lg: "75vh",
                  xl: "80vh",
                },
                overflowY: "auto",
              }}
              onScroll={handleScroll}
            >
              <ATMList atms={atmForAtmList} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
