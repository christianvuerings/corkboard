FROM node:4

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

ADD . /app

RUN npm install --global yarn --quiet && \
    yarn && \
    yarn global add codeclimate-test-reporter
