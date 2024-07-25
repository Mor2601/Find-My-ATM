import { TextField, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface SearchProps {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ search, handleSearch }) => {
  return (
    <TextField
      id="outlined-basic"
      sx={{marginTop:"10px"}}
      
      variant="outlined"
      fullWidth
      value={search}
      onChange={handleSearch}
      
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <InputLabel sx={{paddingRight:"4px"}}>חיפוש לפי עיר</InputLabel>
              <SearchRoundedIcon sx={{color:"black"}} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
export default Search;