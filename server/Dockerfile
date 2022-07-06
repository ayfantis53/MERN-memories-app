FROM node:14.14.0-alpine

WORKDIR '/app'

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build