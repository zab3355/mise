FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./

EXPOSE 3001
CMD ["node", "dist/index.js"]
