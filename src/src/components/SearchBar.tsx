import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  examples?: string[];
}

export const SearchBar = ({ value, onChange, onSubmit, loading, examples = [] }: SearchBarProps) => (
  <Stack spacing={2}>
    <Box display="flex" gap={1.5}>
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
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused": {
              "& fieldset": {
                borderWidth: 2,
              }
            }
          }
        }}
      />
      <Button
        variant="contained"
        size="large"
        onClick={onSubmit}
        disabled={!value.trim() || loading}
        startIcon={!loading && <SearchIcon />}
        sx={{
          minWidth: 140,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          }
        }}
      >
        {loading ? "Generating..." : "Cook"}
      </Button>
    </Box>

    {examples.length > 0 && (
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {examples.map((example) => (
          <Chip
            key={example}
            label={example}
            onClick={() => onChange(example)}
            variant="outlined"
            clickable
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "primary.50",
                transform: "translateY(-2px)",
              }
            }}
          />
        ))}
      </Stack>
    )}
  </Stack>
);
