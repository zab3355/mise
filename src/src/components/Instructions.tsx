import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { InstructionStepSchema } from "../types/recipe";
import type { z } from "zod";

export type InstructionStep = z.infer<typeof InstructionStepSchema>;

interface InstructionsProps {
  steps: InstructionStep[];
}

export const Instructions = ({ steps }: InstructionsProps) => (
  <Box>
    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
      Instructions
    </Typography>
    <List disablePadding>
      {steps.map((step, index) => (
        <Box key={step.step}>
          <ListItem alignItems="flex-start" disableGutters>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid",
                borderColor: "divider",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                mr: 1.5,
                mt: 0.5
              }}
            >
              {step.step}
            </Box>
            <ListItemText primary={step.text} />
          </ListItem>
          {index < steps.length - 1 && <Divider sx={{ ml: 5 }} />}
        </Box>
      ))}
    </List>
  </Box>
);
