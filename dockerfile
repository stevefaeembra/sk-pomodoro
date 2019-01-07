FROM node:10-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./
COPY webpack.config.js ./
RUN npm install

COPY . .
CMD [ "npm", "start" ]
