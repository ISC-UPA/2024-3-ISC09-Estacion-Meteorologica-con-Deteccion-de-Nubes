FROM node:lts
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8081
RUN yarn
RUN yarn run build
CMD ["yarn", "run", "start"]
