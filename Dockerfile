FROM node:slim
MAINTAINER David Redondo Durand (davidfrd2@gmail.com)

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"]