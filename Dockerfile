FROM node:21-alpine as build
LABEL authors="Andrew"
WORKDIR /opt/app

ADD *.json ./

RUN npm install
ADD . .
RUN npx prisma generate && \
    npm run build

FROM node:21-alpine

WORKDIR /opt/app

ADD package.json ./
RUN npm install --only=prod

COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/prisma ./prisma
COPY --from=build /opt/app/tsconfig.json .
COPY --from=build /opt/app/nest-cli.json .

RUN npx prisma generate

CMD ["npm", "start"]