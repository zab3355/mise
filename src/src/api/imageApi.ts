import type { ImageResponse } from "../types/recipe";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

export async function fetchImage(prompt: string): Promise<string | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            console.warn("Image API returned error:", response.status);
            return null;
        }

        const data: ImageResponse = await response.json();
        return data.url;
    } catch (error) {
        console.error("Failed to fetch image:", error);
        return null;
    }
}
