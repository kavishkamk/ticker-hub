FROM node:16.18.0-bullseye-slim

WORKDIR /app

COPY ./package.json ./
RUN yarn install
COPY ./ ./

CMD ["npm", "start"]