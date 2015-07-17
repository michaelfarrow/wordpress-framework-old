<?php
/* Development */
define('DB_NAME', getenv('WP_DB_NAME'));
define('DB_USER', getenv('WP_DB_USER'));
define('DB_PASSWORD', getenv('WP_DB_PASSWORD'));
define('DB_HOST', getenv('WP_DB_HOST') ? getenv('WP_DB_HOST') : 'localhost');

define('SAVEQUERIES', true);
define('WP_DEBUG', true);
define('SCRIPT_DEBUG', true);
