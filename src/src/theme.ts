import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff"
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b"
    },
    divider: "rgba(148, 163, 184, 0.12)",
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "sans-serif"
    ].join(","),
    h1: { fontWeight: 800, fontSize: "3rem", letterSpacing: "-0.02em" },
    h2: { fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-0.01em" },
    h4: { fontWeight: 700, fontSize: "1.875rem", letterSpacing: "-0.01em" },
    h5: { fontWeight: 700, fontSize: "1.5rem" },
    h6: { fontWeight: 700, fontSize: "1.25rem" },
    body1: { fontSize: "1rem", lineHeight: 1.7 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    overline: {
      fontWeight: 700,
      fontSize: "0.75rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  },
  shape: { borderRadius: 12 },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    ...Array(18).fill("none")
  ] as any,
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.4)",
            transform: "translateY(-1px)",
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          }
        }
      }
    }
  }
});
