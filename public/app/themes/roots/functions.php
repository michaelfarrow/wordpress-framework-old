<?php

use Weyforth\ThemeCommon\ThemeCommon;

/**
 * Roots includes
 */

require_once locate_template('lib/config.php');
require_once locate_template('lib/cache.php');

ThemeCommon::load();

require_once locate_template('lib/fields.php');
require_once locate_template('lib/custom-post-types.php');
require_once locate_template('lib/images.php');
require_once locate_template('lib/admin.php');
