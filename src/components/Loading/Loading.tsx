import React from 'react'
import { Box, CircularProgress } from '@mui/material'
const Loading:React.FC = () => {
  return (
    <Box
    sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress sx={{ color: "#1976d2" }} />
  </Box>
  )
}
export default Loading
