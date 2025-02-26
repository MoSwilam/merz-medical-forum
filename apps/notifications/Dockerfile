FROM node:alpine as builder

WORKDIR /app

RUN apk add --no-cache tree

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/notifications apps/notifications
COPY libs libs

RUN pnpm run build notifications

FROM node:alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
  && pnpm install --prod

COPY . .

COPY --from=builder /app/dist ./dist

#CMD ["pnpm", "run", "start:prod", "dist/apps/notification/main"]
CMD ["node", "dist/apps/notifications/apps/notifications/src/main.js"]