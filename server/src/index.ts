import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { normalizeRecipeName, RecipeRequestSchema, Recipe, scaleRecipeForServings } from "./recipe.schema";
import { resolveProvider } from "./providers";
import { ONE_DAY_MS, TTLCache } from "./util/cache";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const provider = resolveProvider();
const cache = new TTLCache<Recipe>(ONE_DAY_MS);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", provider: provider.name });
});

app.post("/api/recipe", async (req, res) => {
  const parsed = RecipeRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const { name, servings } = parsed.data;
  const cacheKey = `${provider.name}:${normalizeRecipeName(name)}`;

  try {
    const { value: recipe, fromCache } = await cache.getOrSet(cacheKey, () => provider.generateRecipe({ name, servings }));
    // Scale for any servings >= 1, no validation
    const scaledRecipe = scaleRecipeForServings(recipe, servings ?? 1);

    return res.json({
      data: scaledRecipe,
      meta: { provider: provider.name, cached: fromCache, servings }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return res.status(500).json({ error: message });
  }
});


import fetch from "node-fetch";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const imageCache = new Map<string, string>();

app.post("/api/image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    // Return cached image if available
    if (imageCache.has(prompt)) {
      return res.json({ url: imageCache.get(prompt) });
    }

    // Check if Unsplash key is configured
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn("UNSPLASH_ACCESS_KEY not configured, returning null");
      return res.json({ url: null });
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data: any = await response.json();
    const imageUrl = data?.results?.[0]?.urls?.regular || null;

    if (imageUrl) {
      imageCache.set(prompt, imageUrl);
    }

    res.json({ url: imageUrl });
  } catch (err) {
    console.error("Image fetch error:", err);
    res.status(500).json({ url: null });
  }
});

app.listen(port, () => {
  console.log(`mise. api listening on http://localhost:${port}`);
});
