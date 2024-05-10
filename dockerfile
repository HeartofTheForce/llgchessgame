FROM node:lts-slim

COPY ./package.json /app/package.json
RUN npm i --prefix app
COPY ./client/package.json /app/client/package.json
RUN npm i --prefix app/client

COPY . /app
WORKDIR /app