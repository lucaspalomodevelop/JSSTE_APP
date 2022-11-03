FROM node:16
COPY . /app
WORKDIR /app
RUN npm run install-full
RUN npm run build
EXPOSE 8081
CMD ["npm", "start"]
