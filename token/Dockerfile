FROM node:18-alpine

EXPOSE 8002

RUN npm i npm@latest -g

WORKDIR /tokens

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]