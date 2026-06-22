import Box from "@mui/material/Box";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  sx?: object;
}

export const Section = ({ children, sx }: SectionProps) => (
  <Box sx={{ my: { xs: 2, sm: 4 }, ...sx }}>{children}</Box>
);
