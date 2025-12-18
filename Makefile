
# Default target
.PHONY: all
all: build# Variables
IMAGE_NAME = gencrafter-website

# Build the Go application
.PHONY: build
build:
	@echo "Building the application..."
	sudo cp /etc/letsencrypt/live/gencrafter.io/privkey.pem certs/
	sudo docker build -t gencrafter-website .
	sudo docker run -d -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt --name gencrafter-website gencrafter-website

# Clean the build artifacts
.PHONY: clean
clean:
	@echo "Cleaning up..."
	sudo docker stop $(shell sudo docker ps -q --filter "ancestor=gencrafter-website")
	sudo docker rm gencrafter-website       
	sudo docker rmi gencrafter-website --force
