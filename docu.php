<?php 

// composer create-project laravel/laravel cms
// composer require laravel/sanctum
// php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
// npm install react react-dom
// npm install react-router-dom
// npm install react-hot-toast
// npm install zustand
// npm install axios
// npm install daisyui
// npm install lucide-react
// npm install lodash
// npm install react-easy-crop


# restart 404 problem
// Route::get('/{any}', function () {
//     return view('app');
// })->where('any', '.*');

// composer require cloudinary-labs/cloudinary-laravel
// php artisan cloudinary:install
// php artisan vendor:publish --tag=cloudinary-laravel-config


// in api always use auth:sanctum as middleware


// php artisan make:model Categories -mcr

#Git
//git init
//git add .
//git commit -m "message"
//git remote add origin URL
//git git branch -M main
//git git push -u origin main


# DEPLOYMENT

// ON RENDER 
// SELECT DOCKERFILE for Environment
// CHANGE MYSQL to Postgres
// CREATE POSTGRES

// ENV
// APP_DEBUG=true
// APP_ENV=production
// APP_FAKER_LOCALE=en_US
// APP_FALLBACK_LOCALE=en
// APP_KEY="base64:mVE/JXsYXu9Hr3Jh4AyaHXreJCc14O0fVYsKIqbhRfc="
// APP_LOCALE=en
// APP_MAINTENANCE_DRIVER=file
// APP_NAME=Au_Bon
// APP_URL=https://au-bon.onrender.com
// AWS_ACCESS_KEY_ID=
// AWS_BUCKET=
// AWS_DEFAULT_REGION=us-east-1
// AWS_SECRET_ACCESS_KEY=
// AWS_USE_PATH_STYLE_ENDPOINT=false
// BCRYPT_ROUNDS=12
// BROADCAST_CONNECTION=log
// CACHE_STORE=database
// CLOUDINARY_API_KEY=975981629986764
// CLOUDINARY_API_SECRET=GnBHrB0ayd7VlZDxgjJ0oEG71Cc
// CLOUDINARY_CLOUD_NAME=diuer43sz
// CLOUDINARY_URL=cloudinary://975981629986764:GnBHrB0ayd7VlZDxgjJ0oEG71Cc@diuer43sz
// DB_CONNECTION=pgsql
// DB_DATABASE=aubon
// DB_HOST=dpg-d6bgkcer433s73d513qg-a
// DB_PASSWORD=KvWxg54yN46lBqNasfJoBUKJ7XJ2Ntjd
// DB_PORT=5432
// DB_USERNAME=aubon_user
// FILESYSTEM_DISK=local
// LOG_CHANNEL=stack
// LOG_DEPRECATIONS_CHANNEL=null
// LOG_LEVEL=debug
// LOG_STACK=single
// MAIL_FROM_ADDRESS=hello@example.com
// MAIL_FROM_NAME=${APP_NAME}
// MAIL_HOST=127.0.0.1
// MAIL_MAILER=log
// MAIL_PASSWORD=null
// MAIL_PORT=2525
// MAIL_SCHEME=null
// MAIL_USERNAME=null
// MEMCACHED_HOST=127.0.0.1
// QUEUE_CONNECTION=database
// REDIS_CLIENT=phpredis
// REDIS_HOST=127.0.0.1
// REDIS_PASSWORD=null
// REDIS_PORT=6379
// SESSION_DOMAIN=null
// SESSION_DRIVER=database
// SESSION_ENCRYPT=false
// SESSION_LIFETIME=120
// SESSION_PATH=/
// VITE_APP_NAME=${APP_NAME}
// VITE_API_URL=${APP_URL}/api

// Dockerfile
// FROM php:8.3-apache
// WORKDIR /var/www/html
// # Install system dependencies including Postgres
// RUN apt-get update && apt-get install -y \
//     git curl zip unzip nodejs npm libpq-dev \
//     && docker-php-ext-install pdo pdo_pgsql \
//     && a2enmod rewrite
// # Install Composer
// COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
// # Copy project files
// COPY . .
// # Install Laravel dependencies
// RUN composer install --no-dev --optimize-autoloader
// # Build React frontend
// RUN npm install && npm run build
// # Point Apache to Laravel's public folder
// RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
// # Permissions for Laravel
// RUN chown -R www-data:www-data storage bootstrap/cache
// RUN php artisan migrate --force
// EXPOSE 80 
// CMD php artisan migrate --force && apache2-foreground


