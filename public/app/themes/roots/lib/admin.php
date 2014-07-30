<?php

function roots_admin_scripts() {
    wp_enqueue_style('roots-admin-css', get_template_directory_uri() . '/assets/css/admin.css');
    wp_enqueue_script('roots-admin-js', get_template_directory_uri() . '/assets/js/admin.js');
}

add_action('admin_enqueue_scripts', 'roots_admin_scripts');