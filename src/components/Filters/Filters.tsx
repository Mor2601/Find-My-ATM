import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface FiltersProps {
  selectionOptions: string[];
  selectedOption: string;
  onSelectionChange: (event: SelectChangeEvent) => void;
  sx?: React.CSSProperties;
  label: string;
  labelId: string;
  id: string;
}
//TODO:add defualt value instead of label
const Filters: React.FC<FiltersProps> = ({
  selectedOption,
  selectionOptions,
  onSelectionChange,
  sx,
  label,
  labelId,
  id,
}) => {

  return (
    <Box sx={sx}>
      <FormControl fullWidth  >
        {/* <InputLabel id={labelId} >{label}</InputLabel> */}
        <Select
          labelId={labelId}
          id={id}
          value={selectedOption}
          // label={label}
          onChange={onSelectionChange}
          
          
        >
          
          {selectionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Filters;