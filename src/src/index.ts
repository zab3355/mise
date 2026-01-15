import express from "express";
import cors from "cors";
import { z } from "zod";
import { getRecipe } from "./providers";
import { recipeSchema } from "./recipe.schema";

const app = express();
app.use(cors());
app.use(express.json());

const SERVINGS_DEFAULT = 4;

app.post("/api/recipe", async (req, res) => {
  try {
    const { name, servings } = req.body;
    const recipe = await getRecipe(name);

    // Normalize servings to nearest supported
    const supported = recipe.servingsSupported;
    let resolvedServings = SERVINGS_DEFAULT;
    if (Array.isArray(supported) && supported.length > 0) {
      resolvedServings =
        supported.reduce((prev, curr) =>
          Math.abs(curr - servings) < Math.abs(prev - servings) ? curr : prev
        );
    }

    // Always return resolvedServings
    const response = {
      ...recipe,
      servings: resolvedServings,
      servingsSupported: supported,
    };

    // Defensive: always return all variant keys, never null
    const allVariants = ["base", "meat", "vegan", "glutenFree"];
    response.variants = Object.fromEntries(
      allVariants.map((key) => [key, recipe.variants[key] || undefined])
    );

    // Validate
    recipeSchema.parse(response);

    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});