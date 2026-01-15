import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface EmptyStateProps {
  examples: string[];
  onExample: (value: string) => void;
}

export const EmptyState = ({ examples, onExample }: EmptyStateProps) => (
  <Box
    sx={{
      border: "1px dashed",
      borderColor: "divider",
      borderRadius: 2,
      p: 3,
      textAlign: "center",
      background: "rgba(17,24,39,0.02)"
    }}
  >
    <Typography variant="h6" fontWeight={700} gutterBottom>
      Ready to plate something new?
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Try a chef-inspired query or let the AI riff on your pantry.
    </Typography>
    <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" gap={1} mt={1.5}>
      {examples.map((example) => (
        <Chip key={example} label={example} clickable onClick={() => onExample(example)} />
      ))}
    </Stack>
  </Box>
);
