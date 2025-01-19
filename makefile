run:
	docker-compose up

run-build:
	docker-compose up --build

run-search:
	pnpm run start:dev search

down: 
	docker-compose down --remove-orphans