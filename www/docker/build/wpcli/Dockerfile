FROM scjudd/wp-cli

ADD https://github.com/wp-cli/wp-cli/releases/download/v0.19.2/wp-cli-0.19.2.phar /usr/local/bin/wp-cli
RUN chmod +x /usr/local/bin/wp-cli

# install the PHP extensions we need
RUN apt-get update && apt-get install -y netcat libpng12-dev libjpeg-dev && rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
	&& docker-php-ext-install gd
RUN docker-php-ext-install mysqli
