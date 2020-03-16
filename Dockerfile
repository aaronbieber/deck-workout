FROM node:8.11.1

WORKDIR /opt/app
COPY . /opt/app
RUN npm cache clean --force && npm install
RUN npm install react-scripts -g --silent
RUN npm install nodemon -g --silent

WORKDIR /opt/app/client
RUN npm install

EXPOSE 3000

WORKDIR /opt/app
CMD [ "npm", "start" ]