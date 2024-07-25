import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useMediaQuery, useTheme } from "@mui/material";
import Map from "./components/Map/Map";
import { fetchData } from "./services/api";
import { ATM } from "./types";
import Search from "./components/Search/Search";
import Filters from "./components/Filters/Filters";
import ATMList from "./components/ATMList/ATMList";
import { SelectChangeEvent } from "@mui/material/Select";

export default function App() {
  const [atms, setAtms] = React.useState<ATM[]>([]);
  const [selectedAtms, setSelectedAtms] = React.useState<ATM[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [selectedBank, setSelectedBank] = React.useState<string>("");
  const [selectedBankType, setSelectedBankType] = React.useState<string>("");

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const getGridItemSize = () => {
    if (isXs) return "20vh";
    if (isSm) return "36vh";
    if (isMd) return "52vh";
    if (isLg) return "65vh";
    return "84vh";
  };

  useEffect(() => {
    fetchData("/api/3/action/datastore_search").then((data) => {
      console.log(data);
      setAtms(data);
      setSelectedAtms(data);
    });
  }, []);

  useEffect(() => {
    const filteredAtms: ATM[] = atms.filter((atm) => {
      return (
        atm.City.includes(search) ||
        atm.Bank_Name === selectedBank ||
        atm.ATM_Type === selectedBankType
      );
    });
    setSelectedAtms(filteredAtms);
  }, [search, selectedBank, selectedBankType]);

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
    // <Container
    //   sx={{
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     paddingTop: '16px',  // Adjust padding as needed
    //     width: '100vw'
    //   }}
    // >
    <Grid container spacing={2} sx={{ flex: 1 }}>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        {atms.length > 0 ? <Map atmsList={selectedAtms} /> : null}
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
                  label="כל סוגי הבנקים"
                  labelId="status-select-bank-type"
                  id="select-bank-type"
                  selectedOption={selectedBankType}
                  selectionOptions={[
                    "משיכת מזומן",
                    "מכשיר מידע/ואו מתן הוראות",
                    "כל סוגי הבנקים",
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
                    '13001 בנק אוצר החייל בע"מ',
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
                height: getGridItemSize(),
                overflowY: "auto",
                // '&::-webkit-scrollbar': {
                //   width: '0.4em',
                  
                // },
                // '&::-webkit-scrollbar-thumb': {
                //   backgroundColor: '#888',
                //   borderRadius: '8px',
                //   border: "3px solid transparent"

                // },
              }}
            >
              <ATMList atms={selectedAtms} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </Container>
  );
}
