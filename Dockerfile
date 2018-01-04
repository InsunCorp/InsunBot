FROM node:9.3.0-alpine

WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

CMD node /usr/src/app/insunbot.js