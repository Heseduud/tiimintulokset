# build environment
FROM node:15-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install react-scripts@4.0.0 -g
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]