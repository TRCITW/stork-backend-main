FROM node:20-alpine as build
LABEL authors="Andrew"
WORKDIR /opt/app
ADD *.json ./
RUN npm install
ADD . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /opt/app
ADD package.json ./
RUN npm install --only=prod
COPY --from=build /opt/app/dist ./dist
RUN npx prisma generate

CMD ["npm", "start"]