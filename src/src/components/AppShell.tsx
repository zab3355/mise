import { Box } from '@mui/material';
import { type ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
  footer: ReactNode;
}

export const AppShell = ({ children, footer }: AppShellProps) => (
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
