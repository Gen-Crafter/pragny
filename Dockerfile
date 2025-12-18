# Use official Nginx image
FROM nginx:latest

# Copy website files into the container
COPY . /usr/share/nginx/html

# Expose both HTTP (port 80) and HTTPS (port 443)
EXPOSE 80 443

# Copy the custom Nginx configuration (if applicable)
COPY nginx.conf /etc/nginx/nginx.conf

# Optional: If you need SSL certsificates to be available inside the container,
# you can mount the certsificate directory when running the container, or copy
# certsificates into the container directly. (Usually, it's better to mount)
# COPY /path/to/certsificates /etc/letsencrypt
RUN mkdir -p /etc/letsencrypt/live/gencrafter.io/
COPY certs/fullchain.pem  /etc/letsencrypt/live/gencrafter.io/fullchain.pem
COPY certs/privkey.pem  /etc/letsencrypt/live/gencrafter.io/privkey.pem
