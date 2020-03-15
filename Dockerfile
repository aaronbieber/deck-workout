FROM node:8.11.1

WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install

COPY . /opt/app

ENV PORT 80
EXPOSE 80

CMD [ "npm", "run", "start" ]