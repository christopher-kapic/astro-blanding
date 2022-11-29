FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --only=production
RUN npm install

COPY . .

RUN npx astro add node -y

RUN sed -i 's/node()/node({mode: "standalone"})/' astro.config.mjs

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]