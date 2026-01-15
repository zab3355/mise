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
        <TableCell sx={{ py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
            Ingredient
          </Typography>
        </TableCell>
        <TableCell width={160} align="right" sx={{ py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
            Amount
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {ingredients.map((ingredient, idx) => (
        <TableRow
          key={`${ingredient.name}-${ingredient.unit}`}
          sx={{
            "&:hover": {
              bgcolor: "action.hover",
            },
            bgcolor: idx % 2 === 0 ? "transparent" : "action.hover",
            transition: "background-color 0.2s ease",
          }}
        >
          <TableCell sx={{ py: 1.5 }}>{ingredient.name}</TableCell>
          <TableCell align="right" sx={{ py: 1.5 }}>
            {ingredient.quantity} {ingredient.unit}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
