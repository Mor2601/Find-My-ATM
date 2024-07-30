import React, { useState, useRef, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Paper } from '@mui/material';
import { ATM } from '../../types';

interface ATMListProps {
  atms: ATM[];
  handleAtmClick: (atm: ATM) => void;
}

const PAGE_SIZE = 50;
const ATMS_ON_SCREEN = 10;
const ATMList: React.FC<ATMListProps> = ({ atms, handleAtmClick }) => {
  const [atmForAtmList, setAtmForAtmList] = useState<ATM[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [hasPrevious, setHasPrevious] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gridRef.current?.scrollTo(0, 0);
    setAtmForAtmList(atms.slice(0, PAGE_SIZE));
    setHasMore(atms.length > PAGE_SIZE);
    setHasPrevious(false);
  }, [atms]);
/**
 * Virtualized list to handle the scroll and load more data
 */
  const fetchMoreData =() => {
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
  }
  /**
   * Virtualized list to handle the scroll and load previous data
   */
  const fetchPreviousData =() => {
    setLoading(true);
    setAtmForAtmList((prevData) => {
      const previousPageStart = Math.max(prevData.length - PAGE_SIZE, 0);
      const previousPageData = atms.slice(
        previousPageStart,
        prevData.length - PAGE_SIZE
      );
      if (previousPageStart === 0) setHasPrevious(false);
      setLoading(false);
      return [...previousPageData, ...prevData];
    });
  }
  /**
   * Listener to handle the scroll event and load more data or previous data
   * @param e 
   */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - ATMS_ON_SCREEN && hasMore && !loading) {
      fetchMoreData();
    }
    if (scrollTop === 0 && hasPrevious && !loading) {
      fetchPreviousData();
    }
  };

  return (
    <Grid
      item
      sx={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}
      onScroll={handleScroll}
      ref={gridRef}
    >
       <List >
      {atmForAtmList.map((atm, index) => {
       
        const iconUrl = atm.ATM_Type === 'משיכת מזומן' ? 'orange-pinned.png' : 'blue-pinned.png';

        return (
          <Paper key={index} elevation={6} sx={{marginBottom:"10px",cursor:"pointer",'&:hover':{backgroundColor:"#f0f0f0"}}}>
          <ListItem key={index} >
                <ListItemText
                  primary={atm.Bank_Name}
                  secondary={`${atm.ATM_Address} ${atm.City} | ${atm.ATM_Type}`}
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
      {loading && <CircularProgress />}
    </Grid>
  );
};

export default ATMList;
