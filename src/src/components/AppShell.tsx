import React from 'react';
import { Box } from '@mui/material';

interface AppShellProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children, footer }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      {footer}
    </Box>
  );
};
