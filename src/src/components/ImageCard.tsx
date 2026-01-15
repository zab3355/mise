
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ResponsiveImage } from "./ResponsiveImage";

interface ImageCardProps {
  alt: string;
  prompt: string;
}

export const ImageCard = ({ alt, prompt }: ImageCardProps) => (
  <>
    {/* Replace with actual image logic if needed */}
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary">
        Visual prompt
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        {alt}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {prompt}
      </Typography>
    </CardContent>
  </>
);
