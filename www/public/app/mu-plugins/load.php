<?php

function load_mu_plugins(){

	$dir_iterator = new RecursiveDirectoryIterator(realpath(WPMU_PLUGIN_DIR));
	$plugins = new RecursiveIteratorIterator($dir_iterator, RecursiveIteratorIterator::SELF_FIRST);
	$plugins->setMaxDepth(0);

	foreach($plugins as $name => $plugin){

		$basename = basename($name);

		if ($basename[0] === '.') {
			continue;
		}

		if (is_dir($name)) {
			require WPMU_PLUGIN_DIR."/$basename/$basename.php";
		}
	}

}

load_mu_plugins();
