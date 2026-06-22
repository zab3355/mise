/**
 * About modal — accessible via the "About" link in the header.
 * Provides project context, tech stack, and author information.
 * Intentionally kept lightweight (no router dependency needed).
 */
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

interface AboutProps {
  open: boolean;
  onClose: () => void;
}

const STACK = [
  "React 19",
  "TypeScript",
  "Material UI",
  "Express",
  "Groq AI",
  "Unsplash",
  "Zod",
  "Vite",
];

export const About = ({ open, onClose }: AboutProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    aria-labelledby="about-title"
    PaperProps={{ sx: { borderRadius: "20px", overflow: "hidden" } }}
  >
    {/* Dark header strip matching the site header */}
    <Box
      sx={{
        background: "#1c1208",
        px: 4,
        py: 3.5,
        position: "relative",
        color: "#fef6eb",
      }}
    >
      <Typography
        id="about-title"
        sx={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 800,
          fontSize: "1.75rem",
          color: "#fef6eb",
          letterSpacing: "-0.02em",
        }}
      >
        About mise.
      </Typography>
      <Typography sx={{ color: "rgba(254,246,235,0.6)", mt: 0.5, fontSize: "0.9rem" }}>
        An AI-powered recipe generator
      </Typography>
      <IconButton
        onClick={onClose}
        aria-label="Close about dialog"
        sx={{
          position: "absolute",
          right: 14,
          top: 14,
          color: "rgba(254,246,235,0.55)",
          "&:hover": { color: "#fef6eb" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>

    <DialogContent sx={{ px: 4, py: 4 }}>
      {/* Origin of the name */}
      <Typography variant="body1" paragraph sx={{ color: "#78350f", lineHeight: 1.75 }}>
        <strong style={{ color: "#1c1917" }}>mise.</strong> is named after the French culinary
        concept <em>mise en place</em> — having every ingredient prepped and ready before you
        cook. This app takes that idea digital: describe any dish, and we&rsquo;ll do the
        mise en place for you.
      </Typography>

      {/* What it does */}
      <Typography variant="body1" paragraph sx={{ color: "#78350f", lineHeight: 1.75 }}>
        Powered by{" "}
        <a
          href="https://groq.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#c2410c", fontWeight: 600 }}
        >
          Groq&rsquo;s
        </a>{" "}
        ultra-fast LLM inference, mise. generates a full recipe with four dietary
        variants — Classic, Meat, Vegan, and Gluten-Free — in seconds. Ingredient
        quantities scale automatically to any serving size.
      </Typography>

      {/* Tech stack */}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, color: "#1c1917", mb: 1.5, mt: 1 }}
      >
        Tech Stack
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3.5 }}>
        {STACK.map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, borderColor: "rgba(28,18,8,0.18)", color: "#78350f" }}
          />
        ))}
      </Box>

      {/* Author — Footer Style */}
      <Box sx={{ borderTop: "1px solid rgba(28,18,8,0.09)", pt: 3 }}>
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "#1c1917", mb: 2.5 }}>
          Built by Zach Brown
        </Typography>

        {/* Social Links Row */}
        <Box sx={{ display: "flex", gap: 2.5, mb: 2, alignItems: "center" }}>
          <a
            href="https://github.com/zab3355"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#c2410c",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/zab3355/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#c2410c",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.875rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            LinkedIn
          </a>
        </Box>

        <Typography variant="body2" sx={{ color: "#a8a29e", fontSize: "0.85rem" }}>
          Full-stack developer &mdash;{" "}
          <a
            href="https://zabrown.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#c2410c", fontWeight: 600 }}
          >
            zabrown.com
          </a>
        </Typography>
      </Box>
    </DialogContent>
  </Dialog>
);
