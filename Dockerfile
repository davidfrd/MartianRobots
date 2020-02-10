FROM node:alpine
MAINTAINER David Redondo Durand (davidfrd2@gmail.com)

COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT ["npm", "start"];
CMD []