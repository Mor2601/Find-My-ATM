import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface FiltersProps {
  selectionOptions: string[];
  selectedOption: string;
  onSelectionChange: (event: SelectChangeEvent) => void;
  sx?: React.CSSProperties;
  labelId: string;
  id: string;
}
const Filters: React.FC<FiltersProps> = ({
  selectedOption,
  selectionOptions,
  onSelectionChange,
  sx,
  labelId,
  id,
}) => {
  return (
    <Box sx={sx}>
      <FormControl fullWidth>
        <Select
          labelId={labelId}
          id={id}
          value={selectedOption}
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
