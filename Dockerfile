FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --only=production
RUN npm install

RUN npx astro add node -y

RUN sed -i '' 's/node()/node({mode: "standalone"})/' astro.config.mjs

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]