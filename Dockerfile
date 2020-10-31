FROM composer:1

RUN apk add --no-cache --update nodejs npm \
 && npm install -g sass \
 && mkdir /code

WORKDIR /code
VOLUME /code
