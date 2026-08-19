# Stage 1: Build PHP dependencies
FROM composer:2.7 AS composer-builder
WORKDIR /app
COPY . .
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-progress --ignore-platform-reqs

# Stage 2: Final Production Image
FROM webdevops/php-nginx:8.3-alpine

# Install Node.js and npm inside final image
RUN apk add --no-cache nodejs npm

# Set environment variables for the container
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DATE_TIMEZONE="UTC"

WORKDIR /app

# Copy built application from previous stages
COPY --from=composer-builder --chown=application:application /app /app

# Ensure storage and bootstrap cache directories are writable
RUN chmod -R 775 /app/storage /app/bootstrap/cache
