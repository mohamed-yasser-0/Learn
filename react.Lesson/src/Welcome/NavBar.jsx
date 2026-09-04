import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../theme/context";

function Navbar() {
  // const {} = React.useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar
        sx={{
          px: { xs: 2, md: 5 },
          pt: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="h5"
            sx={{ color: "secondary.light", lineHeight: 1 }}
          >
            اقرأ وارتقِ
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            borderColor: "secondary.main",
            px: { xs: 0.5, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            fontSize: 14,
          }}
          onClick={() => navigate("/login")}
        >
          تسجيل دخول
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
          sx={{
            px: { xs: 0.5, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            fontSize: 14,
            ml: 3,
          }}
        >
          حساب جديد
        </Button>
      </Toolbar>
      <Divider
        sx={{
          bgcolor: "primary.light",
          width: "100%",
          mt: 1,
          height: 3,
          border: "none",
        }}
      />
    </AppBar>
  );
}
export default Navbar;
