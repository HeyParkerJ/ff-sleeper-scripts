# Could it be that I actually want caddy? Or a custom?
FROM node:current-slim

# Not sure what this should be
WORKDIR /usr/src/app

COPY package.json .

# NPM CI??
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

COPY . .
