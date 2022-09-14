# Set master image
FROM php:fpm-alpine

# Copy composer.lock and composer.json
COPY composer.lock composer.json package.json /var/www/html/

# Set working directory
WORKDIR /var/www/html

# Install Additional dependencies
RUN apk update && apk add --no-cache \
    build-base shadow vim curl \
    nodejs npm yarn \
    php \
    php-fpm \
    php-common \
    php-pdo \
    php-pdo_pgsql \
    php-pgsql \
    postgresql-dev \
    php-mbstring \
    php-xml \
    php-openssl \
    php-json \
    php-phar \
    php-zip \
    php-gd \
    php-dom \
    php-session \
    php-zlib

# Add and Enable PHP-PDO Extenstions
RUN docker-php-ext-install pdo pdo_pgsql

# Install PHP Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Remove Cache
RUN rm -rf /var/cache/apk/*

# Add UID '1000' to www-data
RUN usermod -u 1000 www-data

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Change current user to www
USER www-data

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]