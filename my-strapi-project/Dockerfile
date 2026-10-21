FROM node:22-alpine

# أدوات لازمة لبناء native modules (better-sqlite3 / sharp)
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
