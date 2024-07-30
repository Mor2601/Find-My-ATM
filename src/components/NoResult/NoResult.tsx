import { Paper, Typography } from "@mui/material";

export const NoResult: React.FC = () => {
  return (
    <Paper
      
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "53vh",
        width: "100%",
        boxSizing: "border-box",
        padding: 2,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        העיר לא קיימת במערכת או שהערך שהוכנס לא בעברית, אנא נסה שנית
      </Typography>
    </Paper>
  );
};
export default NoResult;