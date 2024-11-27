FROM node:lts
RUN npm install -g expo-cli
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8081
CMD ["yarn", "web"]
