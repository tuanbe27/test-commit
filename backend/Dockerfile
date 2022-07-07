FROM node:lts-alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn 

COPY . /app
CMD yarn start
EXPOSE 3001