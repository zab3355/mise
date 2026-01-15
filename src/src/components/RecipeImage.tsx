

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { fetchRecipeImage } from "../utils/images";

export interface RecipeImageProps {
  recipeName: string;
  alt: string;
  aspectRatio?: "16:9" | "1:1";
}


export const RecipeImage: React.FC<RecipeImageProps> = ({
  recipeName,
  alt,
  aspectRatio = "16:9",
}) => {
  const theme = useTheme();

  const [src, setSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchRecipeImage(prompt)
      .then((url) => {
        if (active) setSrc(url);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [prompt]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        boxShadow: theme.shadows[1],
        aspectRatio: aspectRatio === "16:9" ? "16/9" : "1/1",
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          loading="lazy"
        />
      )}
    </Box>
  );
};