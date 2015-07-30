<?php

add_filter('upload_dir', function($data){
	$base = '/storage/uploads';

	if(!is_dir($base)){
		@mkdir($base);
		@chown($base, 'www-data');
	}

	$data['path'] = $base . substr($data['path'], strpos($data['path'], '/uploads') + 8);
	$data['basedir'] = $base . substr($data['basedir'], strpos($data['basedir'], '/uploads') + 8);

	return $data;
});
