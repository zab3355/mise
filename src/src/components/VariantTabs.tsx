import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { SyntheticEvent } from "react";
import type { VariantKey } from "../types/recipe";

const LABELS: Record<VariantKey, string> = {
  base: "Classic",
  meat: "Meat",
  vegan: "Vegan",
  glutenFree: "Gluten-Free"
};

interface VariantTabsProps {
  variants: VariantKey[];
  selected: VariantKey;
  onChange: (variant: VariantKey) => void;
}

export const VariantTabs = ({ variants, selected, onChange }: VariantTabsProps) => {
  const handleChange = (_: SyntheticEvent, newValue: VariantKey) => onChange(newValue);
  const safeSelected = variants.includes(selected) ? selected : variants[0];
  return (
    <Tabs value={safeSelected} onChange={handleChange} variant="scrollable" allowScrollButtonsMobile>
      {variants.map((key) => (
        <Tab key={key} value={key} label={LABELS[key]} />
      ))}
    </Tabs>
  );
};
