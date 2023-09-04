FROM node:18-alpine

EXPOSE 8004

RUN npm i npm@latest -g

WORKDIR /products

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]