FROM node:alpine

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["nodemon", "./src/bot.js"]