# Stage 1: Build Node.js assets
FROM node:20-alpine AS node-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build PHP dependencies
FROM composer:2.7 AS composer-builder
WORKDIR /app
COPY . .
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-progress

# Stage 3: Final Production Image
FROM webdevops/php-nginx:8.3-alpine

# Set environment variables for the container
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DATE_TIMEZONE="UTC"

WORKDIR /app

# Copy built application from previous stages
COPY --from=composer-builder --chown=application:application /app /app
COPY --from=node-builder --chown=application:application /app/public/build /app/public/build

# Ensure storage and bootstrap cache directories are writable
RUN chmod -R 775 /app/storage /app/bootstrap/cache

# Run Laravel optimizations during image build (optional but recommended for prod)
USER application
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache
USER root
