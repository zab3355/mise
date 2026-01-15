# mise.

A modern recipe generation application powered by Groq's LLM API. Enter any dish name, select servings, and get a detailed recipe with multiple variants (base, meat, vegan, gluten-free), complete with scaled ingredients and step-by-step instructions.

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MUI-7.3-007FFF?style=for-the-badge&logo=mui" alt="MUI" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Groq-API-FF6B00?style=for-the-badge" alt="Groq" />
</p>

## Features

- **AI-Powered Recipe Generation** - Uses Groq's LLM API for intelligent recipe creation
- **Multiple Variants** - Get base, meat, vegan, and gluten-free versions of any recipe
- **Dynamic Scaling** - Automatic ingredient scaling for any serving size
- **Beautiful Images** - Unsplash integration for stunning food photography
- **Strict Validation** - Zod schema validation ensures data integrity
- **24-Hour Caching** - Fast responses with intelligent caching layer
- **Docker Support** - Full containerization for easy deployment
- **Modern UI** - Clean, responsive interface built with Material-UI

## Architecture

```
mise/
├── server/              # Express + TypeScript backend
│   ├── src/
│   │   ├── providers/   # Recipe generation providers (Groq, Sample)
│   │   │   ├── groq.provider.ts
│   │   │   ├── sample.provider.ts
│   │   │   └── types.ts
│   │   ├── util/        # Utilities (caching, JSON parsing)
│   │   ├── index.ts     # Main server entry
│   │   └── recipe.schema.ts
│   └── Dockerfile
├── src/                 # React + Vite frontend
│   ├── src/
│   │   ├── api/         # API client layer
│   │   ├── components/  # React components
│   │   ├── constants/   # App constants
│   │   ├── types/       # TypeScript types
│   │   └── theme.ts     # MUI theme configuration
│   └── Dockerfile
└── docker-compose.yml
```

### Tech Stack

**Frontend:**
- React 19.2 with TypeScript
- Material-UI 7.3 for components
- Vite 7.2 for build tooling
- Zod 4.3 for runtime validation

**Backend:**
- Express 5.2 with TypeScript
- Groq API for LLM inference
- Unsplash API for images
- Node-fetch 2.7 for HTTP requests
- Zod 4.3 for validation

**DevOps:**
- Docker & Docker Compose
- Nginx for serving static files
- TypeScript for type safety

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker & Docker Compose (optional)
- Groq API key ([get one here](https://console.groq.com))
- Unsplash Access Key ([get one here](https://unsplash.com/developers)) (optional)

### Local Development

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd mise
```

**2. Set up the backend**
```bash
cd server
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
npm install
npm run dev
```

The API will be running on `http://localhost:3001`

**3. Set up the frontend** (in a new terminal)
```bash
cd src
cp .env.example .env
# VITE_API_BASE_URL is optional for local dev
npm install
npm run dev
```

The UI will be running on `http://localhost:5173`

**4. Open your browser**

Navigate to `http://localhost:5173` and start generating recipes!

### Docker Deployment

**1. Configure environment variables**
```bash
cp server/.env.example server/.env
cp src/.env.example src/.env
```

Edit `server/.env` with your API keys:
```env
PORT=3001
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
UNSPLASH_ACCESS_KEY=your_unsplash_key_here  # optional
```

**2. Build and run**
```bash
docker compose up --build
```

- **API**: `http://localhost:3001`
- **Web UI**: `http://localhost:4173`

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `3001` | Server port |
| `GROQ_API_KEY` | **Yes** | - | Groq API key for LLM access |
| `GROQ_MODEL` | No | `llama-3.1-8b-instant` | Groq model to use |
| `UNSPLASH_ACCESS_KEY` | No | - | Unsplash API key for images |

### Frontend (`src/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | No | `http://localhost:3001` | Backend API URL |

**Note:** In Docker, `VITE_API_BASE_URL` defaults to `http://api:3001` for container networking.

## API Reference

### POST `/api/recipe`

Generate a recipe with multiple variants.

**Request:**
```json
{
  "name": "spaghetti carbonara",
  "servings": 4
}
```

**Response:**
```json
{
  "data": {
    "name": "Spaghetti Carbonara",
    "description": "Classic Italian pasta dish...",
    "cookTimeMinutes": 25,
    "difficulty": "Medium",
    "servings": 4,
    "variants": {
      "base": {
        "ingredients": [
          { "name": "spaghetti", "quantity": 100, "unit": "g" },
          ...
        ]
      },
      "meat": { ... },
      "vegan": { ... },
      "glutenFree": { ... }
    },
    "instructions": [
      { "step": 1, "text": "Bring water to boil..." },
      ...
    ],
    "image": {
      "alt": "Spaghetti Carbonara dish",
      "prompt": "Italian spaghetti carbonara..."
    }
  },
  "meta": {
    "provider": "groq",
    "cached": false,
    "servings": 4
  }
}
```

### POST `/api/image`

Fetch a food image from Unsplash.

**Request:**
```json
{
  "prompt": "Italian spaghetti carbonara plated elegantly"
}
```

**Response:**
```json
{
  "url": "https://images.unsplash.com/photo-..."
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "provider": "groq"
}
```

## Development

### Build for Production

**Server:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd src
npm run build
npm run preview
```

### Type Checking

```bash
# Server
cd server
npm run lint

# Frontend
cd src
npm run lint
```

## Project Structure

```
mise/
├── server/
│   ├── src/
│   │   ├── providers/
│   │   │   ├── groq.provider.ts      # Groq LLM integration
│   │   │   ├── sample.provider.ts    # Sample data provider
│   │   │   ├── index.ts              # Provider resolver
│   │   │   └── types.ts              # Provider interfaces
│   │   ├── util/
│   │   │   ├── cache.ts              # TTL cache implementation
│   │   │   └── json.ts               # JSON parsing utilities
│   │   ├── index.ts                  # Express server setup
│   │   └── recipe.schema.ts          # Zod schemas
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts             # Recipe API client
│   │   │   └── imageApi.ts           # Image API client
│   │   ├── components/
│   │   │   ├── AppShell.tsx          # Layout wrapper
│   │   │   ├── CardWrapper.tsx       # Card container
│   │   │   ├── EmptyState.tsx        # No recipe state
│   │   │   ├── Footer.tsx            # Page footer
│   │   │   ├── Header.tsx            # Page header
│   │   │   ├── ImageCard.tsx         # Recipe image display
│   │   │   ├── IngredientsTable.tsx  # Ingredients list
│   │   │   ├── Instructions.tsx      # Cooking steps
│   │   │   ├── PageContainer.tsx     # Page wrapper
│   │   │   ├── RecipeMeta.tsx        # Recipe metadata
│   │   │   ├── SearchBar.tsx         # Recipe search input
│   │   │   ├── Section.tsx           # Content section
│   │   │   ├── ServingsSelector.tsx  # Servings input
│   │   │   └── VariantTabs.tsx       # Variant switcher
│   │   ├── constants/
│   │   │   ├── examples.ts           # Example recipes
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── recipe.ts             # TypeScript types
│   │   ├── App.tsx                   # Main app component
│   │   ├── App.css                   # Global styles
│   │   ├── main.tsx                  # React entry point
│   │   └── theme.ts                  # MUI theme
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

```

### Customizing the Theme

Edit `src/src/theme.ts` to change colors, typography, and component overrides.


## Acknowledgments

- [Groq](https://groq.com) for blazing-fast LLM inference
- [Unsplash](https://unsplash.com) for beautiful food photography
- [Material-UI](https://mui.com) for the component library
- [Vite](https://vitejs.dev) for the lightning-fast dev experience

---