<?php

/**
 * Roots includes
 */

require_once locate_template('lib/config.php');
require_once locate_template('lib/cache.php');

Root_Theme_Tools::load();
	
require_once locate_template('lib/fields.php');
require_once locate_template('lib/custom-post-types.php');
require_once locate_template('lib/images.php');
