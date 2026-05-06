FROM public.ecr.aws/docker/library/node:24.15-alpine AS base
RUN npm install -g corepack
RUN corepack enable

FROM base AS builder
WORKDIR /app

COPY . .
RUN pnpm dlx turbo@^2 prune fit-route-web --docker
RUN rm -f ./out/full/apps/fit-route-web/.env.local

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full .
RUN pnpm build --filter fit-route-web

FROM public.ecr.aws/docker/library/node:24.15-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/fit-route-web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/fit-route-web/.next/static ./apps/fit-route-web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/fit-route-web/public ./apps/fit-route-web/public

EXPOSE 3000

CMD ["node", "apps/fit-route-web/server.js"]