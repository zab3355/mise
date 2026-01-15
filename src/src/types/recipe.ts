
import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  unit: z.string()
});

export const InstructionStepSchema = z.object({
  step: z.number().int(),
  text: z.string()
});

export const RecipeVariantSchema = z.object({
  ingredients: z.array(IngredientSchema)
});

export const RecipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  cookTimeMinutes: z.number().int(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  servings: z.number().min(1).optional(),
  variants: z.object({
    base: RecipeVariantSchema,
    meat: RecipeVariantSchema.optional(),
    vegan: RecipeVariantSchema.optional(),
    glutenFree: RecipeVariantSchema.optional()
  }),
  instructions: z.array(InstructionStepSchema),
  image: z.object({
    alt: z.string(),
    prompt: z.string()
  })
});

export const RecipeResponseSchema = z.object({
  _errors: z.array(z.any()).optional(),
  data: RecipeSchema,
  meta: z
    .object({
      provider: z.string().optional(),
      cached: z.boolean().optional()
    })
    .optional()
});

export type Ingredient = z.infer<typeof IngredientSchema>;
export type RecipeVariant = z.infer<typeof RecipeVariantSchema>;
export type Recipe = z.infer<typeof RecipeSchema>;
export type RecipeResponse = z.infer<typeof RecipeResponseSchema>;
export type VariantKey = keyof Recipe["variants"];

export interface ImageResponse {
  url: string | null;
}

