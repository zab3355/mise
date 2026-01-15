import { SampleProvider } from "./sample.provider";
import { ProviderName, RecipeProvider } from "./types";

import { GroqProvider } from "./groq.provider";

export const resolveProvider = (): RecipeProvider => {
  return new GroqProvider(process.env.GROQ_API_KEY);
};
