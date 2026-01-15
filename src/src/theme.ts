import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },
    secondary: { main: "#ec4899" },
    background: {
      default: "#f8fafc",
      paper: "#fff"
    },
    surface: { main: "#f3f4f6" },
    accent: { main: "#0ea5e9" },
    text: {
      primary: "#111827",
      secondary: "#6b7280"
    }
  },
  typography: {
    fontFamily: [
      "Space Grotesk",
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif"
    ].join(","),
    h1: { fontWeight: 800, fontSize: "2.5rem" },
    h2: { fontWeight: 800, fontSize: "2rem" },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 }
  },
  shape: { borderRadius: 16 },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 200,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 700 }
      }
    }
  }
});
