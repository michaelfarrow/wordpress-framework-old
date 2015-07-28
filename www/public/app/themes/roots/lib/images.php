<?php

// Custom Image Quality

function roots_jpeg_quality_callback($arg) {
   return (int)80;
}

add_filter('jpeg_quality', 'roots_jpeg_quality_callback');

// Custom image sizes

// add_image_size('custom', 300, 400, true);