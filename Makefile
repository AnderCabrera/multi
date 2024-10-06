default: up

# Directorio donde está Prisma
SERVER_DIR=./server
CLIENT_DIR=./client

up:
    docker-compose up -d
    cd $(SERVER_DIR) && npm install
    cd $(SERVER_DIR) && npx prisma migrate dev --name init
    cd $(SERVER_DIR) && npm run start:dev

dev:
    cd $(CLIENT_DIR) && npm install
    cd $(CLIENT_DIR) && npm run dev