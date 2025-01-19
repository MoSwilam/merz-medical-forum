FROM node:alpine as builder

WORKDIR /app

RUN apk add --no-cache tree

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/admin apps/admin
COPY libs libs

RUN pnpm run build admin

FROM node:alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm \
  && pnpm install --prod

COPY . .

COPY --from=builder /app/dist ./dist

#CMD ["pnpm", "run", "start:prod", "dist/apps/admin/main"]
CMD ["node", "dist/apps/admin/apps/admin/src/main.js"]