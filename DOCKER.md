# Running with Docker

## Quick Start

1. **Stop local dev servers** (if running):
```bash
# Stop the npm run dev processes
# Press Ctrl+C in both terminal windows
```

2. **Set environment variables**:
```bash
# Make sure server/.env exists with your API keys
echo "GROQ_API_KEY=your_key_here" > server/.env
echo "GROQ_MODEL=llama-3.1-8b-instant" >> server/.env
```

3. **Build and run**:
```bash
docker compose up --build
```

4. **Access the application**:
- Web UI: http://localhost:4173
- API: http://localhost:3001

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
