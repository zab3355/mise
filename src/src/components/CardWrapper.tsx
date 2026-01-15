import Card from "@mui/material/Card";
import { type ReactNode } from "react";

interface CardWrapperProps {
  children: ReactNode;
  sx?: object;
}

export const CardWrapper = ({ children, sx }: CardWrapperProps) => (
  <Card
    className="glass-card"
    sx={{
      border: "1px solid",
      borderColor: "divider",
      ...sx
    }}
  >
    {children}
  </Card>
);
