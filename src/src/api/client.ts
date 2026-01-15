import type { RecipeResponse } from "../types/recipe";
import { RecipeResponseSchema } from "../types/recipe";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

async function requestRecipe(
  name: string,
  servings: number
): Promise<RecipeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, servings })
  });

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error("API returned invalid JSON");
  }

  if (!response.ok) {
    const message =
      typeof (json as any)?.error === "string"
        ? (json as any).error
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  const parsed = RecipeResponseSchema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error("Response validation failed");
  }

  return parsed.data;
}
export async function fetchRecipe(
  name: string,
  servings: number
): Promise<RecipeResponse> {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error(`Invalid name argument: ${String(name)}`);
  }

  if (typeof servings !== "number" || Number.isNaN(servings)) {
    throw new Error(`Invalid servings argument: ${String(servings)}`);
  }

  try {
    return await requestRecipe(name.trim(), servings);
  } catch (error) {
    throw normalizeError(error);
  }
}

function normalizeError(error: unknown): Error {
  return error instanceof Error
    ? error
    : new Error("Network error. Check that the API is running.");
}
