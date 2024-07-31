import React, {  useContext } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { StateContext } from "../../context/StateContext";


const Search: React.FC = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("StateContext must be used within a StateProvider");
  }
  const { setSearch, search } = context;
  /**
   * Update the search Context
   * @param event 
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    event.preventDefault(); 
    setSearch(event.target.value);
  };

  

  return (
    <form >
    <TextField
      id="outlined-basic"
      sx={{
        marginTop: "10px",
        direction: "rtl",
      }}
      placeholder="חיפוש לפי עיר"
      variant="outlined"
      fullWidth
      value={search}
      onChange={handleInputChange}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: "black" }} />
            </InputAdornment>
          ),
        },
        inputLabel: {
          sx: {
            direction: "rtl",
            textAlign: "right",
            right: 0,
            left: "auto",
            transformOrigin: "top right",
          },
        },
      }}
    />
    </form>
  );
};

export default Search;
