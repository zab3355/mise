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
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            className="gradient-badge"
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            m
          </Box>
          <Typography variant="h5" fontWeight={700} letterSpacing={-0.5}>
            mise.
          </Typography>
        </Box>
        {provider && (
          <Chip
            size="small"
            label={`⚡ ${provider}`}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
