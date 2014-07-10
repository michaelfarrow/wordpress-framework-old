<?php

function roots_admin_style() {
    wp_enqueue_style('roots-admin', get_template_directory_uri() . '/assets/css/admin.css');
}

add_action('admin_enqueue_scripts', 'roots_admin_style');