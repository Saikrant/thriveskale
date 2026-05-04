FROM node:20.19.0

WORKDIR /app

COPY . .

WORKDIR /app/thrive-skale-web

RUN npm ci

RUN npm test && npm run lint && npm run build
