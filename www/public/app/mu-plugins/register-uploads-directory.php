<?php

add_filter('upload_dir', function($data){
	$base = '/storage/uploads';

	if(posix_geteuid() != 0 && !is_dir($base))
		mkdir($base);

	$data['path'] = $base . substr($data['path'], strpos($data['path'], '/uploads') + 8);
	$data['basedir'] = $base . substr($data['basedir'], strpos($data['basedir'], '/uploads') + 8);

	return $data;
});
