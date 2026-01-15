import { Recipe, RecipeRequest, RecipeSchema } from "../recipe.schema";
import { RecipeProvider } from "./types";

type Profile = {
  cuisine: string;
  starch: string;
  sauce: string;
  herb: string;
  aromatic: string;
  protein: string;
  veganProtein: string;
  description: string;
};

const PROFILES: Profile[] = [
  {
    cuisine: "Italian",
    starch: "rigatoni",
    sauce: "tomato passata",
    herb: "basil",
    aromatic: "shallot",
    protein: "crispy pancetta",
    veganProtein: "roasted mushrooms",
    description: "Silky tomato base with herbaceous notes and gentle heat"
  },
  {
    cuisine: "Mexican",
    starch: "long-grain rice",
    sauce: "roasted poblano crema",
    herb: "cilantro",
    aromatic: "white onion",
    protein: "ancho chicken thigh",
    veganProtein: "charred zucchini",
    description: "Smoky, bright flavors with citrus and gentle char"
  },
  {
    cuisine: "Japanese",
    starch: "soba noodles",
    sauce: "miso-ginger glaze",
    herb: "scallions",
    aromatic: "ginger",
    protein: "soy-mirin salmon",
    veganProtein: "crispy tofu",
    description: "Umami-forward glaze with clean aromatics"
  },
  {
    cuisine: "Mediterranean",
    starch: "pearled couscous",
    sauce: "lemon-olive oil",
    herb: "parsley",
    aromatic: "shallot",
    protein: "grilled lamb",
    veganProtein: "chickpeas",
    description: "Bright citrus with olive oil and gentle char"
  }
];

const toTitleCase = (value: string) => value.replace(/\b\w/g, (c) => c.toUpperCase());

export class SampleProvider implements RecipeProvider {
  name = "sample";

  async generateRecipe(request: RecipeRequest): Promise<Recipe> {
    const title = request.name.trim().length ? toTitleCase(request.name.trim()) : "Chef's Choice";
    const profile = this.selectProfile(title);
    const recipe = this.composeRecipe(title, profile);
    return RecipeSchema.parse(recipe);
  }

  private selectProfile(name: string): Profile {
    const hint = name.toLowerCase();
    const match = PROFILES.find((p) => hint.includes(p.cuisine.toLowerCase()));
    if (match) return match;
    const index = Math.abs(this.hashString(name)) % PROFILES.length;
    return PROFILES[index];
  }

  private composeRecipe(name: string, profile: Profile): Recipe {
    const baseIngredients = [
      { name: profile.starch, quantity: 90, unit: "g" },
      { name: profile.aromatic, quantity: 0.5, unit: "small" },
      { name: "Garlic", quantity: 1, unit: "clove" },
      { name: profile.sauce, quantity: 0.33, unit: "cup" },
      { name: profile.herb, quantity: 1, unit: "tbsp" },
      { name: "Olive oil", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: 0.75, unit: "tsp" },
      { name: "Black pepper", quantity: 0.25, unit: "tsp" }
    ];

    const meatIngredients = [
      ...baseIngredients,
      { name: profile.protein, quantity: 90, unit: "g" }
    ];

    const veganIngredients = [
      ...baseIngredients,
      { name: profile.veganProtein, quantity: 90, unit: "g" },
      { name: "Toasted seeds", quantity: 1, unit: "tbsp" }
    ];

    const glutenFreeIngredients = baseIngredients.map((ingredient) =>
      ingredient.name === profile.starch ? { ...ingredient, name: `${profile.starch} (gluten-free)` } : ingredient
    );

    return {
      name,
      description: `${profile.cuisine}-leaning take: ${profile.description}. Built to scale for weeknight cooking.`,
      cookTimeMinutes: 30,
      difficulty: "Medium",
      servings: 4,
      variants: {
        base: { ingredients: baseIngredients },
        meat: { ingredients: meatIngredients },
        vegan: { ingredients: veganIngredients },
        glutenFree: { ingredients: glutenFreeIngredients }
      },
      instructions: [
        { step: 1, text: "Prep all aromatics and bring water (or brothy water) to a boil if using noodles or grains." },
        { step: 2, text: "Cook the starch until just shy of done; reserve some cooking liquid if pasta or grains." },
        { step: 3, text: "Sauté aromatics in olive oil, add sauce base, then fold in proteins until warmed or cooked." },
        { step: 4, text: "Combine with starch, herbs, and cooking liquid as needed; season with salt and pepper." }
      ],
      image: {
        alt: `${name} finished dish with ${profile.herb} garnish`,
        prompt: `${profile.cuisine} inspired ${name} plated elegantly, neutral ceramics, soft directional light`
      }
    };
  }

  private hashString(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
