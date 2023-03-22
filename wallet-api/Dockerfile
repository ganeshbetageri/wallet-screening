FROM node:14

WORKDIR /wallet-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
