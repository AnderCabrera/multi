default: up

# Directorio donde está Prisma
SERVER_DIR=./server

up:
	docker-compose up -d
	cd $(SERVER_DIR) && npx prisma migrate dev --name init

dev:
	npm install
	cd ./client && npm run dev