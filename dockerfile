FROM node:18
COPY . /app
WORKDIR /app
RUN npm install
WORKDIR /app/dashboard
RUN npm install
RUN npm run build
WORKDIR /app
EXPOSE 8080
CMD ["npm", "start"]