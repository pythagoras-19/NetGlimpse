FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "index.js"]
