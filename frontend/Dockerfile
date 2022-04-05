FROM node:alpine as node
RUN npm install -g http-server
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]