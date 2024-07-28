import React, { useState } from "react";
import { TextField, InputAdornment, InputLabel, Box } from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchProps {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ search, handleSearch }) => {
  const [value, setValue] = useState<string>(search);
  const [isHebrewNotValid, setIsHebrewNotValid] = useState<boolean>(false);
  const isHebrew = (text: string) => {
    // Check if the text contains Hebrew characters
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValue(value);

    // Only trigger the search handler if the input contains Hebrew characters
    if (isHebrew(value) || value === "") {
      setIsHebrewNotValid(false);
      handleSearch(event);
    } else {
      setIsHebrewNotValid(true);
    }
  };
  return (
    
    <TextField
      id="outlined-basic"
      sx={{ 
        marginTop: "10px",
        // direction: "rtl",
        
        // "& label": { direction: "rtl" }, // Set label direction to RTL
        // "& legend": { direction: "rtl" } // Set legend direction to RTL
      }}
      label="חיפוש לפי עיר"
      
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleInputChange}
      error={isHebrewNotValid && value.length > 0}
      helperText={isHebrewNotValid && value.length > 0 ? "הכנס ערך בעברית" : ""}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchRoundedIcon sx={{ color: "black" }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default Search;
