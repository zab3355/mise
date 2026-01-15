import Box from "@mui/material/Box";
import { useState } from "react";

interface ResponsiveImageProps {
  src?: string;
  alt: string;
  aspectRatio?: number; // width / height
  fallback?: string;
  sx?: object;
}

const FALLBACK_IMG = "/assets/placeholder.png";

export const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  fallback = FALLBACK_IMG,
  sx
}: ResponsiveImageProps) => {
  const [error, setError] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "surface.main",
        ...sx
      }}
    >
      <img
        src={error || !src ? fallback : src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={() => setError(true)}
      />
    </Box>
  );
};
