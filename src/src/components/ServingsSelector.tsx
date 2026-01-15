import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

interface ServingsSelectorProps {
  servings: number;
  onChange: (value: number) => void;
}

export const ServingsSelector = ({ servings, onChange }: ServingsSelectorProps) => (
  <div>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      Servings
    </Typography>
    <ToggleButtonGroup
      color="primary"
      value={servings}
      exclusive
      size="small"
      onChange={(_, newValue) => {
        if (typeof newValue === "number" && newValue > 0) onChange(newValue);
      }}
    >
      {[1, 2, 4, 6, 8, 10, 12, 16, 20].map((serving) => (
        <ToggleButton key={serving} value={serving} sx={{ minWidth: 44 }}>
          {serving}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </div>
);
