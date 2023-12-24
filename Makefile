docker:
	sudo docker-compose -f docker-compose.dev.yml up --build

build:
	sudo docker-compose -f docker-compose.dev.yml build

bash:
	sudo docker exec -it app-dev sh

stop:
	sudo sudo docker-compose docker-compose.dev.yml down

.PHONY: docker bash stop