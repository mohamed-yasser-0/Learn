import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../home/Navbar";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Outlet />
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          position: "sticky",
          bottom: 20,
          left: 20,
          borderRadius: "12px",
          padding: "5px 10px",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: 3,
          display:
            location.pathname === "/home"
              ? "none"
              : { xs: "none", md: "inline-flex" },
        }}
      >
        رجوع
      </Button>
    </>
  );
}
