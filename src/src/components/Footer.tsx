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
      <FooterIconLink
        href="https://github.com/zabrown"
        label="GitHub"
        icon={<GitHubIcon fontSize="medium" />}
      />
      <FooterIconLink
        href="https://linkedin.com/in/zabrown"
        label="LinkedIn"
        icon={<LinkedInIcon fontSize="medium" />}
      />
      <FooterIconLink
        href="https://zabrown.com"
        label="Portfolio"
        icon={<LanguageIcon fontSize="medium" />}
      />
    </Stack>
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Zach Brown &mdash; mise.
    </Typography>
  </Box>
);

import { useTheme } from "@mui/material/styles";

interface FooterIconLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const FooterIconLink: React.FC<FooterIconLinkProps> = ({ href, label, icon }) => {
  const theme = useTheme();
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      color="inherit"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        transition: theme.transitions.create(["transform", "color"], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          color: theme.palette.primary.main,
          transform: 'scale(1.13)',
        },
      }}
    >
      {icon}
    </Link>
  );
};
