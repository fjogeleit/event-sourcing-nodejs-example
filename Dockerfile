FROM node:14-alpine as dependencies

WORKDIR /var/www/app

COPY . .

RUN npm set progress=false \
    && npm config set depth 0 \
    && npm install \
    && npm run build

FROM node:14-alpine

ENV TZ "Europe/Berlin"

WORKDIR /var/www/app

COPY --from=dependencies /var/www/app/dist ./dist
COPY package*.json ./
COPY event-store.config.js ./

RUN npm set progress=false \
    && npm config set depth 0 \
    && npm install --only=prod

CMD ["npm", "run", "start:prod"]