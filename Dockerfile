# Stage 1: Build PHP dependencies
FROM composer:2.7 AS composer-builder
WORKDIR /app
COPY . .
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-progress --ignore-platform-reqs

# Stage 2: Final Production Image
FROM webdevops/php-nginx:8.3-alpine

# Install Node.js, npm, and essential PHP extensions (exif, gd, etc.)
RUN apk add --no-cache nodejs npm \
    php83-exif \
    php83-gd \
    php83-intl \
    php83-fileinfo \
    php83-zip \
    php83-bcmath

# Set environment variables for the container
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DATE_TIMEZONE="UTC"

WORKDIR /app

# Copy built application from previous stages
COPY --from=composer-builder --chown=application:application /app /app

# Ensure storage and bootstrap cache directories are writable
RUN chmod -R 775 /app/storage /app/bootstrap/cache
