FROM node:alpine as node
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "start" ; "npm", "run", "serve"]