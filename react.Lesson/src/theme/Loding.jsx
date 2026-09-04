import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = ({ text = "Loading..." }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#0f172a", 
        color: "#fff",
      }}
    >
      <CircularProgress size={60} thickness={4} />
      
      <Typography mt={2} fontSize={18}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingPage;