run:
	docker-compose up

run-build:
	docker-compose up --build

run-search:
	pnpm run start:dev search

down: 
	docker-compose down --remove-orphans


deploy-dev:
	cd k8s/ && helm upgrade medical-forum medical-forum --values medical-forum/values.yaml -f medical-forum/values-dev.yaml -n dev

e2e:
	pnpm run test:e2e
	