import { z } from "zod";
import { Recipe, RecipeRequest, RecipeSchema } from "../recipe.schema";
import { stripJsonFence, extractJsonBlock, normalizeNullsToUndefined } from "../util/json";
import { RecipeProvider } from "./types";

const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const API_URL = "https://api.groq.com/openai/v1/chat/completions";

const CombinedSchema = z.object({
  isRecipe: z.boolean(),
  reason: z.string().optional().nullable(),
  recipe: z.unknown().optional()
});

export class GroqProvider implements RecipeProvider {
  name = "groq";
  private apiKey: string;

  constructor(apiKey?: string) {
    if (!apiKey) throw new Error("GROQ_API_KEY is required");
    this.apiKey = apiKey;
  }

  async generateRecipe(request: RecipeRequest): Promise<Recipe> {
    const system = `
You are a chef system that ONLY returns a single JSON object.
Return JSON with:
{
  "isRecipe": boolean,
  "reason": string,
  "recipe": {
    "name": string,
    "description": string,
    "cookTimeMinutes": number,
    "difficulty": "Easy" | "Medium" | "Hard",
    "servings": number,
    "variants": {
      "base": { "ingredients": [ { "name": string, "quantity": number, "unit": string } ] },
      "meat"?: { "ingredients": [...] },
      "vegan"?: { "ingredients": [...] },
      "glutenFree"?: { "ingredients": [...] }
    },
    "instructions": [ { "step": number, "text": string } ],
    "image": { "alt": string, "prompt": string }
  }
}

If the request is NOT food/recipe-related, set isRecipe=false and explain in reason. If it is a recipe, set isRecipe=true and include the full recipe object. Quantities must be per-serving so they can be scaled. Return ONLY JSON, no prose.
    `.trim();

    const messages = [
      { role: "system", content: system },
      { role: "user", content: `Recipe: ${request.name}. Return JSON only.` }
    ];

    let combined: z.infer<typeof CombinedSchema> | null = null;
    let lastError: Error | null = null;
    let lastRawContent: string | null = null;


    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const content = await this.chat(messages, { temperature: 0.1, max_tokens: 800 });
        lastRawContent = content;
        const jsonBlock = extractJsonBlock(stripJsonFence(content).trim());

        if (!jsonBlock) {
          throw new Error("No JSON found in model output");
        }

        const normalized = normalizeNullsToUndefined(JSON.parse(jsonBlock));
        combined = CombinedSchema.parse(normalized);
        break;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown parse error");

        if (attempt === 0 && lastRawContent) {
          messages.push({
            role: "user",
            content: `Invalid JSON response. Please return ONLY valid JSON without null values. Previous output:\n\n${lastRawContent}`
          });
        }
      }
    }

    if (!combined) {
      throw new Error(`Groq returned invalid JSON. ${lastError?.message ?? "Unknown parse error"}`);
    }

    const reason = combined.reason?.trim() ? combined.reason.trim() : "No reason provided.";
    if (!combined.isRecipe) {
      throw new Error(`Only food or recipe requests are supported. ${reason}`);
    }

    if (!combined.recipe || typeof combined.recipe !== "object") {
      throw new Error("Recipe generation failed. Try a different prompt.");
    }
    const cleanedRecipe: any = { ...combined.recipe };
    if ('servingsSupported' in cleanedRecipe) {
      delete cleanedRecipe.servingsSupported;
    }
    if (!cleanedRecipe.variants || typeof cleanedRecipe.variants !== 'object') {
      throw new Error("Recipe is missing variants");
    }
    if (!cleanedRecipe.variants.base || typeof cleanedRecipe.variants.base !== 'object' || !Array.isArray(cleanedRecipe.variants.base.ingredients)) {
      throw new Error("Recipe is missing a valid 'base' variant");
    }
    return RecipeSchema.parse(normalizeNullsToUndefined(cleanedRecipe));
  }

  private async chat(
    messages: Array<{ role: string; content: string }>,
    options?: { temperature?: number; max_tokens?: number }
  ): Promise<string> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    try {
      const body = {
        model: MODEL,
        messages,
        temperature: options?.temperature ?? 0.1,
        max_tokens: options?.max_tokens ?? 800,
        response_format: { type: "text" }
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Groq API error (${response.status}): ${msg}`);
      }

      const data: any = await response.json();
      return data.choices?.[0]?.message?.content ?? "{}";
    } catch (error) {
      clearTimeout(timeout);
      const message = error instanceof Error ? error.message : "Unknown network error";
      throw new Error(
        `Groq API request failed. Check GROQ_API_KEY and network connectivity. ${message}`
      );
    }
  }
}