FROM node:lts
WORKDIR /app
COPY package.json ./
RUN yarn install
RUN npm install
COPY . .
EXPOSE 8081
RUN yarn run build
CMD ["yarn", "run", "start"]
