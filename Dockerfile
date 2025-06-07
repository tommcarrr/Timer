FROM node:20-alpine
WORKDIR /app

# install dependencies
COPY server/package*.json server/
RUN cd server && npm install
COPY client/package*.json client/
RUN cd client && npm install

# copy source
COPY server server
COPY client client

# build frontend
RUN cd client && npm run build

WORKDIR /app/server
EXPOSE 3000
CMD ["node", "index.js"]
