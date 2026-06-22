import { useCallback, useMemo, useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { fetchRecipe } from "./api/client";
import { Header } from "./components/Header";
import { IngredientsTable } from "./components/IngredientsTable";
import { Instructions } from "./components/Instructions";
import { EmptyState } from "./components/EmptyState";
import { RecipeMeta } from "./components/RecipeMeta";
import { SearchBar } from "./components/SearchBar";
import { ServingsSelector } from "./components/ServingsSelector";
import { VariantTabs } from "./components/VariantTabs";
import { PageContainer } from "./components/PageContainer";
import { Section } from "./components/Section";
import { CardWrapper } from "./components/CardWrapper";
import { Footer } from "./components/Footer";
import { AppShell } from "./components/AppShell";
import { ImageCard } from "./components/ImageCard";
import { theme } from "./theme";
import { EXAMPLES } from "./constants/examples";
import type { Recipe, VariantKey } from "./types/recipe";

import "./App.css";

const ALL_VARIANTS: VariantKey[] = ["base", "meat", "vegan", "glutenFree"];

function App() {
  // Modern React: useReducer for form state
  const [form, setForm] = useState({ name: "", servings: 4 });
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [variant, setVariant] = useState<VariantKey>("base");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | undefined>();
  const [snackOpen, setSnackOpen] = useState(false);

  // Variants logic
  const availableVariants = useMemo<VariantKey[]>(() => {
    if (!recipe || !recipe.variants) return ["base"];
    const keys = ALL_VARIANTS.filter((key) => Boolean(recipe.variants[key]));
    return keys.length > 0 ? keys : ["base"];
  }, [recipe]);

  const safeVariant = useMemo<VariantKey>(() => {
    if (!availableVariants.includes(variant)) {
      return availableVariants[0];
    }
    return variant;
  }, [variant, availableVariants]);

  // Load recipe from API
  const loadRecipe = useCallback(async () => {
    const { name, servings } = form;
    if (typeof name !== "string" || !name.trim()) {
      setError("Please enter a valid recipe name.");
      return;
    }
    if (typeof servings !== "number" || servings < 1) {
      setError("Please select a valid servings count.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRecipe(name.trim(), servings);
      setRecipe(response.data);
      setProvider(response.meta?.provider);
      setVariant("base");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to generate recipe";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [form]);

  useEffect(() => {
    if (recipe && form.name.trim()) {
      loadRecipe();
    }
  }, [form.servings]);

  // Handlers
  const handleNameChange = (value: string) => setForm(f => ({ ...f, name: value }));
  const handleServingsChange = (value: number) => setForm(f => ({ ...f, servings: value }));
  const handleExample = (example: string) => setForm(f => ({ ...f, name: example }));

  return (
    <ThemeProvider theme={theme}>
      <AppShell footer={<Footer />}>
        <PageContainer>
          <Header provider={provider} />

          <Section>
            <Stack spacing={3}>
              <Box className="hero fade-in">
                <Typography variant="overline" color="text.secondary">
                  mise.
                </Typography>
                <Typography variant="h4">
                  From prompt to on your plate, insert your dream dish here.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Type any dish, pick servings, and flip between variants.
                </Typography>
              </Box>

              <SearchBar
                value={form.name}
                onChange={handleNameChange}
                onSubmit={loadRecipe}
                loading={loading}
                examples={EXAMPLES}
              />

              {loading && <LinearProgress />}
            </Stack>
          </Section>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!recipe && !loading && !error && (
            <EmptyState
              examples={EXAMPLES}
              onExample={handleExample}
            />
          )}

          {recipe && (
            <>
              <Section>
                <CardWrapper>
                  <ImageCard
                    alt={recipe.image.alt}
                    prompt={recipe.image.prompt}
                  />
                  <RecipeMeta recipe={recipe} />
                </CardWrapper>
              </Section>

              <Section>
                <ServingsSelector
                  servings={form.servings}
                  onChange={handleServingsChange}
                />
                <VariantTabs
                  variants={availableVariants}
                  selected={safeVariant}
                  onChange={setVariant}
                />

                <IngredientsTable
                  ingredients={recipe.variants[variant]?.ingredients ?? []}
                />
                <Instructions
                  steps={recipe.instructions}
                />
              </Section>
            </>
          )}

          <Snackbar
            open={snackOpen}
            autoHideDuration={4000}
            onClose={() => setSnackOpen(false)}
          />
        </PageContainer>
      </AppShell>
    </ThemeProvider>
  );
}

export default App;
