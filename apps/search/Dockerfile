FROM node:alpine as builder

WORKDIR /app

RUN apk add --no-cache tree

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/search apps/search
COPY libs libs

RUN pnpm run build search

FROM node:alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
  && pnpm install --prod

COPY . .

COPY --from=builder /app/dist ./dist

#CMD ["node", "dist/apps/search/main.js"]
# CMD ["pnpm", "run", "start:prod", "dist/apps/search/main"]
CMD ["node", "dist/apps/search/apps/search/src/main.js"]