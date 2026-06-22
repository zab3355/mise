import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Recipe } from "../types/recipe";

interface RecipeMetaProps {
  recipe: Recipe;
}

export const RecipeMeta = ({ recipe }: RecipeMetaProps) => (
  <Box>
    <Typography variant="h4" fontWeight={800} gutterBottom>
      {recipe.name}
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 820 }} gutterBottom>
      {recipe.description}
    </Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mt={1}>
      <Chip label={`${recipe.cookTimeMinutes} min`} color="primary" variant="outlined" />
      <Chip label={recipe.difficulty} variant="outlined" />
      <Chip label={`servings: ${recipe.servings || 4}`} variant="outlined" />
    </Stack>
  </Box>
);
