/**
 * Recursively converts all `null` values in an object to `undefined` (removes keys for optional fields).
 * Use before Zod validation to avoid LLM nulls breaking strict schemas.
 */
export function normalizeNullsToUndefined<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(normalizeNullsToUndefined) as any;
  }
  if (obj && typeof obj === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === null) continue; // Remove nulls entirely for optional fields
      const norm = normalizeNullsToUndefined(v);
      if (norm !== undefined) out[k] = norm;
    }
    return out;
  }
  return obj;
}
export const stripJsonFence = (content: string) => {
  const trimmed = content.trim();
  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "").trim();
  }
  return trimmed;
};

export function parseJsonString<T>(content: string): T {
  return JSON.parse(stripJsonFence(content)) as T;
}

export function extractJsonBlock(text: string): string | null {
  const match = text.match(/({[\s\S]*})|(\[[\s\S]*\])/);
  return match ? match[0] : null;
}
