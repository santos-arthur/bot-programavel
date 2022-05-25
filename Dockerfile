FROM node:alpine

WORKDIR /app/

COPY package*.json ./

RUN npm install --production=false

COPY . .

CMD ["npm", "dev"]