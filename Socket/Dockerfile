FROM node:8

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","index.js"]
