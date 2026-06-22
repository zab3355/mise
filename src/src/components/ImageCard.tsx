import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { fetchImage } from "../api/imageApi";

interface ImageCardProps {
  alt: string;
  prompt: string;
}

export const ImageCard = ({ alt, prompt }: ImageCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      setLoading(true);
      const url = await fetchImage(prompt);
      if (mounted) {
        setImageUrl(url);
        setLoading(false);
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [prompt]);

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={6}
          sx={{
            bgcolor: "background.default",
            minHeight: 300
          }}
        >
          <CircularProgress />
        </Box>
      ) : imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={alt}
          className="fade-in"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: 450,
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}

      <CardContent sx={{ px: 3, pt: 3, pb: 4 }}>
        <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
          Visual prompt
        </Typography>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {alt}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prompt}
        </Typography>
      </CardContent>
    </>
  );
};

