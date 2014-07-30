<?php

// Used for clearing the cache on deploy

if(array_key_exists('cache_flush_key', $_GET)
	&& $_GET['cache_flush_key']=='o4YcWNdL1n1FAYLWGA2mze0HkTKHttTWgkbwRmSr'
	&& function_exists('w3tc_pgcache_flush')){
	w3tc_pgcache_flush();
}