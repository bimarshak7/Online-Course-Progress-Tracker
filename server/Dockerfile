FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
RUN node db/initDB
EXPOSE 3000
CMD ["npm","run","dev"]
