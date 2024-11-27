FROM node:lts
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8081
CMD ["yarn", "web"]
