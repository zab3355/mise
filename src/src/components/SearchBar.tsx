import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  examples?: string[];
}

export const SearchBar = ({ value, onChange, onSubmit, loading, examples = [] }: SearchBarProps) => (
  <Stack spacing={1.5}>
    <Box display="flex" gap={1}>
      <TextField
        fullWidth
        label="What do you want to cook?"
        placeholder="e.g. penne vodka, miso salmon, crispy tacos"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <Button variant="contained" size="large" onClick={onSubmit} disabled={!value.trim() || loading}>
        {loading ? "Generating" : "Cook"}
      </Button>
    </Box>
    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
      {examples.map((example) => (
        <Chip key={example} label={example} onClick={() => onChange(example)} variant="outlined" clickable />
      ))}
    </Stack>
  </Stack>
);
