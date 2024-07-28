import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon,Paper } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { ATM } from '../../types';
import L from 'leaflet';


interface ATMListProps {
  atms: ATM[];
  handleAtmClick: (atm: ATM) => void;
}

const ATMList: React.FC<ATMListProps> = ({ atms,handleAtmClick }) => {

  return (
    <List >
      {atms.map((atm, index) => {
        // Determine color based on ATM type
        const iconUrl = atm.ATM_Type === 'משיכת מזומן' ? 'orange-pinned.png' : 'blue-pinned.png';

        return (
          <Paper key={index} elevation={6} sx={{marginBottom:"10px",cursor:"pointer",'&:hover':{backgroundColor:"#f0f0f0"}}}>
          <ListItem key={index} >
                <ListItemText
                  primary={atm.Bank_Name}
                  secondary={`${atm.ATM_Address} - ${atm.ATM_Type}, ${atm.City}`}
                  onClick={() => {
                    handleAtmClick(atm);
                  }}
                sx={{textAlign:"right"}}                
                />
                
            <ListItemIcon sx={{display:"flex",justifyContent:"flex-end"}}>
                <img
                src={iconUrl}
                alt={`${atm.ATM_Type} icon`}
                width={28}
                height={28}
              />
            </ListItemIcon>
          </ListItem>
          </Paper>
        );
      })}
    </List>
  );
};
export default ATMList;