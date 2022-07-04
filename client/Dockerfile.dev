FROM node:14-alpine

WORKDIR '/app'

COPY ./package*.json ./

RUN npm start

COPY . .

CMD ["npm", "run", "start"]