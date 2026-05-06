FROM public.ecr.aws/docker/library/node:24.15-alpine AS base
RUN npm install -g corepack
RUN corepack enable

FROM base AS builder
WORKDIR /app

COPY . .
RUN pnpm dlx turbo@^2 prune fit-route --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full .
RUN pnpm build --filter fit-route

FROM public.ecr.aws/docker/library/node:24.15-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=installer --chown=hono:nodejs /app/apps/fit-route/dist ./apps/fit-route/dist
COPY --from=installer --chown=hono:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=hono:nodejs /app/apps/fit-route/package.json ./apps/fit-route/package.json

USER hono

EXPOSE 3001

CMD ["node", "apps/fit-route/dist/index.js"]