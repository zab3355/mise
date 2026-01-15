import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().nonnegative(),
  unit: z.string().min(1)
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const RecipeVariantSchema = z.object({
  ingredients: z.array(IngredientSchema).nonempty()
});

export type RecipeVariant = z.infer<typeof RecipeVariantSchema>;

export const InstructionStepSchema = z.object({
  step: z.number().int().min(1),
  text: z.string().min(1)
});

export type InstructionStep = z.infer<typeof InstructionStepSchema>;



export const RecipeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  cookTimeMinutes: z.number().int().positive(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  servings: z.number().min(1).optional(),
  variants: z.object({
    base: RecipeVariantSchema,
    meat: RecipeVariantSchema.optional(),
    vegan: RecipeVariantSchema.optional(),
    glutenFree: RecipeVariantSchema.optional()
  }),
  instructions: z.array(InstructionStepSchema).nonempty(),
  image: z.object({
    alt: z.string().min(1),
    prompt: z.string().min(1)
  })
});


export const RecipeRequestSchema = z.object({
  name: z.string().trim().min(1, "Recipe name is required"),
  servings: z.number().min(1).optional()
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeRequest = z.infer<typeof RecipeRequestSchema>;
export type RecipeDifficulty = Recipe["difficulty"];
export type RecipeVariantKey = keyof Recipe["variants"];


const SERVING_PRECISION = 2;

const scaleIngredient = (ingredient: Ingredient, servings: number): Ingredient => ({
  ...ingredient,
  quantity: Number((ingredient.quantity * servings).toFixed(SERVING_PRECISION))
});

const scaleVariant = (variant: RecipeVariant | undefined, servings: number): RecipeVariant | undefined => {
  if (!variant) return undefined;
  return {
    ingredients: variant.ingredients.map((ingredient) => scaleIngredient(ingredient, servings))
  };
};
  export function scaleRecipeForServings(recipe: Recipe, servings: number): Recipe {
    const safeServings = typeof servings === "number" && servings > 0 ? servings : (recipe.servings || 1);
    return {
      ...recipe,
      variants: {
        base: scaleVariant(recipe.variants.base, safeServings)!,
        meat: scaleVariant(recipe.variants.meat, safeServings),
        vegan: scaleVariant(recipe.variants.vegan, safeServings),
        glutenFree: scaleVariant(recipe.variants.glutenFree, safeServings)
      },
      servings: safeServings
    };
  }

export const normalizeRecipeName = (name: string) => name.trim().toLowerCase();
