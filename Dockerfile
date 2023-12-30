FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

ENV TZ Europe/Kiev

CMD ["node", "server"]