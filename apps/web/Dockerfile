FROM node:16-alpine

WORKDIR /usr/apps/web

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "run", "start" ]