import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#1A5C38",
      light: "#2D8A56",
      dark: "#0F3D26",
      contrastText: "#fff",
    },
    secondary: {
      main: "#C9A84C",
      light: "#E8C97A",
      dark: "#8B6914",
      contrastText: "#1A5C38",
    },
    background: {
      default: "#FAF7F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C1C1C",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "'Tajawal', 'Cairo', sans-serif",
    h1: { fontFamily: "'Amiri', serif", fontWeight: 700 },
    h2: { fontFamily: "'Amiri', serif", fontWeight: 700 },
    h3: { fontFamily: "'Amiri', serif", fontWeight: 700 },
    h4: { fontFamily: "'Amiri', serif", fontWeight: 700 },
    h5: { fontFamily: "'Amiri', serif", fontWeight: 700 },
    h6: { fontFamily: "'Amiri', serif" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Tajawal', sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          borderRadius: 6,
          textTransform: "none",
          padding: "10px 28px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(26,92,56,0.12)",
          boxShadow: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 32px rgba(26,92,56,0.13)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export default theme;
