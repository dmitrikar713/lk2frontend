FROM node:16.14.0-alpine as react_build

WORKDIR /app

COPY package.json /app

RUN npm i -g npm@8.5.1
RUN npm install --save react-tinder-card --legacy-peer-deps
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent
COPY . .
RUN npm run build

#prepare nginx
FROM nginx:1.16.0-alpine

COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY . .

ENV PORT 80
EXPOSE $PORT

CMD [ "nginx", "-g", "daemon off;"]