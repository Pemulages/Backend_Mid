FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm install bcrypt --build-from-source && \
    apk del make gcc g++ python3 \
    npm uninstall bcrypt --save || true \
    npm install bcryptjs --save

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "echo 'Waiting for database to be ready...' && sleep 10 && npm start","npm", "start"]