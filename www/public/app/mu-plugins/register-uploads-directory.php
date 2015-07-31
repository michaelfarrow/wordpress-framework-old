<?php

add_filter('upload_dir', function($data){
	$base = '/storage/uploads';

	$data['path'] = $base . substr($data['path'], strpos($data['path'], '/uploads') + 8);
	$data['basedir'] = $base . substr($data['basedir'], strpos($data['basedir'], '/uploads') + 8);

	return $data;
});
