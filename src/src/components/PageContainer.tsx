import Container from "@mui/material/Container";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  sx?: object;
}

export const PageContainer = ({ children, maxWidth = "lg", sx }: PageContainerProps) => (
  <Container
    maxWidth={maxWidth}
    sx={{
      px: { xs: 1.5, sm: 3 },
      py: { xs: 2, sm: 4 },
      mx: "auto",
      ...sx
    }}
  >
    {children}
  </Container>
);
