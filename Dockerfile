FROM node:12.14.1-alpine

WORKDIR /opt/server/

COPY . .
RUN npm install

EXPOSE 3000 27017

CMD ["npm", "run", "start"]
