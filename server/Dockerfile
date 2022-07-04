FROM node:16-alpine

WORKDIR '/app'

COPY ./package*.json ./

RUN npm start

COPY . .

CMD ["npm", "run", "start"]