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
              className="gradient-step-number"
              sx={{
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.875rem",
                flexShrink: 0,
                mr: 2,
                mt: 0.25,
              }}
            >
              {step.step}
            </Box>
            <ListItemText
              primary={step.text}
              primaryTypographyProps={{
                variant: "body1",
                sx: { lineHeight: 1.7 }
              }}
            />
          </ListItem>
          {index < steps.length - 1 && <Divider sx={{ ml: 5 }} />}
        </Box>
      ))}
    </List>
  </Box>
);
