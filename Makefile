default: up

SERVER_DIR=./server
CLIENT_DIR=./client

up:
	docker-compose up -d
	bash -c "cd $(SERVER_DIR) && npm install"
	bash -c "cd $(SERVER_DIR) && npm run start:dev"

dev:
	bash -c "cd $(CLIENT_DIR) && npm install"
	bash -c "cd $(CLIENT_DIR) && npm run dev"