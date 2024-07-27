import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon,Paper } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { ATM } from '../../types';
import L from 'leaflet';


interface ATMListProps {
  atms: ATM[];
}

const ATMList: React.FC<ATMListProps> = ({ atms }) => {

  return (
    <List >
      {atms.map((atm, index) => {
        // Determine color based on ATM type
        const iconUrl = atm.ATM_Type === 'משיכת מזומן' ? 'orange-pinned.png' : 'blue-pinned.png';

        return (
          <Paper key={index} elevation={6} sx={{marginBottom:"10px"}}>
          <ListItem key={index} >
                <ListItemText
                  primary={atm.Bank_Name}
                  secondary={`${atm.ATM_Address} - ${atm.ATM_Type}, ${atm.City}`}
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