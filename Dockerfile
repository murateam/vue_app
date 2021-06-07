# build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

COPY . .

#production-stage
FROM nginx:stable-alpine as prod-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
