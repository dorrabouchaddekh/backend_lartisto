# FROM node:9-slim
# WORKDIR /server
# COPY package.json ./server
# RUN npm install
# COPY . /server
# CMD ["npm", "start"]

FROM node:lts-buster
WORKDIR /usr/src/server
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]