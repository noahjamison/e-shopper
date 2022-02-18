FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json /usr/src/app/

RUN npm install

COPY . ./usr/src/app

EXPOSE 3434 3306

CMD ["npm", "run", "start:dev"]