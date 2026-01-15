import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 6,
      py: 3,
      borderTop: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      textAlign: "center"
    }}
  >
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mb={1}>
      <Link
        href="https://github.com/zab3355"
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
        color="inherit"
        sx={{
          display: "inline-flex",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            color: "primary.main",
            transform: "scale(1.1)",
          },
        }}
      >
        <GitHubIcon fontSize="medium" />
      </Link>
      <Link
        href="https://www.linkedin.com/in/zab3355/"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
        color="inherit"
        sx={{
          display: "inline-flex",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            color: "primary.main",
            transform: "scale(1.1)",
          },
        }}
      >
        <LinkedInIcon fontSize="medium" />
      </Link>
      <Link
        href="https://zabrown.com"
        target="_blank"
        rel="noopener"
        aria-label="Portfolio"
        color="inherit"
        sx={{
          display: "inline-flex",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            color: "primary.main",
            transform: "scale(1.1)",
          },
        }}
      >
        <LanguageIcon fontSize="medium" />
      </Link>
    </Stack>
    <Typography variant="body2" color="text.secondary">
      {new Date().getFullYear()} Zach Brown &mdash; mise.
    </Typography>
  </Box>
);
