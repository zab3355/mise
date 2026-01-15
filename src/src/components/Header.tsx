import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  provider?: string;
}

export const Header = ({ provider }: HeaderProps) => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: "linear-gradient(135deg, #111827, #1f2937)",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 16
            }}
          >
            m
          </Box>
          <Typography variant="h5" fontWeight={700} letterSpacing={0.5}>
            mise.
          </Typography>
        </Box>
        {provider && <Chip size="small" label={`provider: ${provider}`} sx={{ backgroundColor: "#111827", color: "#f8fafc" }} />}
      </Toolbar>
    </AppBar>
  );
};
