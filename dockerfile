FROM node:current-alpine as build-step
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY default.conf.template /etc/nginx/templates/
ENV API_HOST=0.0.0.0
ENV API_PORT=8888
COPY --from=build-step /app/build /usr/share/nginx/html
