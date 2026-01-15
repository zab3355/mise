import { Recipe, RecipeRequest } from "../recipe.schema";

export interface RecipeProvider {
  name: string;
  generateRecipe(request: RecipeRequest): Promise<Recipe>;
}
