FROM node:16
WORKDIR /app

COPY ./package* /app/
COPY ./.babelrc /app/
COPY ./.sequelizerc /app/
COPY /src /app/src/

RUN npm install
RUN npm install -g sequelize-cli

CMD sequelize db:migrate & npm run start