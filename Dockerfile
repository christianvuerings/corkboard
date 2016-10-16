FROM node:4

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app
ADD yarn.lock /app

RUN npm install --global yarn && yarn

ADD . /app
