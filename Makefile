
# Default target
.PHONY: all
all: build# Variables
IMAGE_NAME = pragny

# Build the Go application
.PHONY: build
build:
	@echo "Building the application..."
	sudo cp /etc/letsencrypt/live/pragny.xyz/privkey.pem certs/
	sudo docker build -t pragny .
	sudo docker run -d -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt --name pragny pragny

# Clean the build artifacts
.PHONY: clean
clean:
	@echo "Cleaning up..."
	sudo docker stop $(shell sudo docker ps -q --filter "ancestor=pragny")
	sudo docker rm pragny       
	sudo docker rmi pragny --force
