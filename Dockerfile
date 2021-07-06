FROM node:14-slim as pre-build
COPY package*.json ./
RUN npm version 0.0.1

FROM node:14-slim

WORKDIR /app/

COPY --from=pre-build package*.json ./

RUN npm install --production

COPY build/module ./
COPY static ./static
COPY build/app-bundle ./static

CMD ["node", "app.js"]

EXPOSE 8080
