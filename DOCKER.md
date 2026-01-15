# Running with Docker

## Quick Start

1. **Stop local dev servers** (if running):
```bash
# Stop the npm run dev processes (Ctrl+C in both terminals)
```

2. **Create server/.env with your API keys**:
```bash
# Edit server/.env and add your actual keys
PORT=3002
GROQ_API_KEY=your_actual_groq_key_here
GROQ_MODEL=llama-3.1-8b-instant
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```

**Important**: The `.env` file must exist in `server/.env` with real API keys.

3. **Build and run**:
```bash
docker compose up --build
```

4. **Access the application**:
- Web UI: http://localhost:4173
- API: http://localhost:3002

## Common Issues

**Port already in use**:
```bash
# If you get "address already in use" error:
# Make sure to stop your local dev servers first
# Then run:
docker compose down
docker compose up --build
```

**Environment variables not set**:
The warning "GROQ_API_KEY variable is not set" means you need to create `server/.env` with your API keys.

## Docker Commands

```bash
# Build without starting
docker compose build

# Start services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up
```
