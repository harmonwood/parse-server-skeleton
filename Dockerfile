FROM node:alpine

RUN npm install -g --silent parse-server mongodb-runner

RUN mkdir -p /parse-server/cloud
RUN mkdir -p /parse-server/public

WORKDIR /parse-server

COPY index.js index.js
COPY ./package*.json ./
COPY ./cloud ./cloud
COPY ./public ./public

RUN npm install --silent

EXPOSE 1337

ENTRYPOINT ["npm", "start"]