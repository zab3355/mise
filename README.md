# mise.


Application developed with React + MUI frontend, and an Express + Zod backend. Uses Groq's hosted LLM API for dynamic recipe generation. Responses are strictly validated JSON and cached for 24 hours.

## Quick start (Yarn)

```bash
# backend (Groq LLM provider)
cd server
cp .env.example .env
npm install
npm run dev

# frontend
cd src
cp .env.example .env      
npm install
npm run dev
```

Builds:
- `server`: `yarn build && yarn start`
- `src`: `yarn build && yarn preview`


## Docker (API + web, optional)

1) Copy envs:
```bash
cp server/.env.example server/.env
cp src/.env.example src/.env   
```

2) Build and run both services:
```bash
docker compose up --build
```
- API available on `http://localhost:3001` (service name `api` inside the network)
- Web UI served by nginx on `http://localhost:4173`
