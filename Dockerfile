# Could it be that I actually want caddy? Or a custom?
FROM node:current-slim

ENV NODE_ENV=production

# Not sure what this should be
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

# NPM CI??
RUN npm install --production

EXPOSE 8080

CMD ["npm", "start:prod"]

COPY . .
