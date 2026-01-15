import Card from "@mui/material/Card";
import { ReactNode } from "react";

interface CardWrapperProps {
  children: ReactNode;
  sx?: object;
}

export const CardWrapper = ({ children, sx }: CardWrapperProps) => (
  <Card
    sx={{
      border: "1px solid",
      borderColor: "divider",
      background: (theme) =>
        `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.surface?.main || "#f3f4f6"})`,
      boxShadow: 3,
      ...sx
    }}
  >
    {children}
  </Card>
);
