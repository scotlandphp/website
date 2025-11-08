FROM php:7-cli-alpine

RUN apk add --no-cache --update icu-data-full nodejs npm \
 && npm install -g sass

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer  

