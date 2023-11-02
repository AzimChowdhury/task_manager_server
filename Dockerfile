FROM node:18-alpine
# create app diractiory
WORKDIR /src/app
# install app depandancies
COPY package*.json yarn.lock ./
# install app depandancies
RUN yarn install
# bundle app source
COPY . .
# expose port
EXPOSE 5000
# run app
CMD ["yarn", "start"]