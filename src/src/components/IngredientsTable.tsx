import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { Ingredient } from "../types/recipe";

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export const IngredientsTable = ({ ingredients }: IngredientsTableProps) => (
  <Table size="small" aria-label="ingredients">
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2" color="text.secondary">
            Ingredient
          </Typography>
        </TableCell>
        <TableCell width={160} align="right">
          <Typography variant="subtitle2" color="text.secondary">
            Amount
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {ingredients.map((ingredient) => (
        <TableRow key={`${ingredient.name}-${ingredient.unit}`}>
          <TableCell>{ingredient.name}</TableCell>
          <TableCell align="right">
            {ingredient.quantity} {ingredient.unit}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
