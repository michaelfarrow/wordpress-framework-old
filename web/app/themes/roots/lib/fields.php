<?php

// Uncomment once you've imported all fields to hide ACF from admins
// define( 'ACF_LITE' , true );
include_once(__DIR__.'/../acf/acf.php' );
include_once(__DIR__.'/../acf-fields/options-page/acf-options-page.php' );
include_once(__DIR__.'/../acf-fields/flexible-content-field/acf-flexible-content.php' );
include_once(__DIR__.'/../acf-fields/repeater-field/acf-repeater.php' );

function remove_options_menu(){
    remove_menu_page( 'acf-options' );  
}

// Comment out to enable options menu
add_action( 'admin_menu', 'remove_options_menu', 11, 0 );


// Standard page definition, shows all fields

if(function_exists("register_field_group"))
{
    register_field_group(array (
        'id' => 'acf_default',
        'title' => 'Default',
        'fields' => array (
        ),
        'location' => array (
            array (
                array (
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'default',
                    'order_no' => 0,
                    'group_no' => 0,
                ),
            ),
        ),
        'options' => array (
            'position' => 'normal',
            'layout' => 'no_box',
            'hide_on_screen' => array (
            ),
        ),
        'menu_order' => 0,
    ));
}



// Field definitions

register_field_group(array (
        'id' => 'acf_home',
        'title' => 'Home',
        'fields' => array (
            array (
                'key' => 'field_home_images',
                'label' => 'Images',
                'name' => 'images',
                'type' => 'repeater',
                'instructions' => 'wehfew fwejnfejrwnfkerjnger ernjenrjgnerj rej ngerjng jenj ngjejrn gjerng er g ergerg er g egerger gerg erg reger gregererg',
                'required' => 1,
                'sub_fields' => array (
                    array (
                        'key' => 'field_home_images_image',
                        'label' => 'Image',
                        'name' => 'image',
                        'type' => 'image',
                        'required' => 1,
                        'column_width' => '',
                        'save_format' => 'object',
                        'preview_size' => 'thumbnail',
                        'library' => 'all',
                    ),
                ),
                'row_min' => '',
                'row_limit' => '',
                'layout' => 'row',
                'button_label' => 'Add Image',
            ),
        ),
        'location' => array (
            array (
                array (
                    'param' => 'page_template',
                    'operator' => '==',
                    'value' => 'template-home.php',
                    'order_no' => 0,
                    'group_no' => 1,
                ),
            ),
        ),
        'options' => array (
            'position' => 'normal',
            'layout' => 'default',
            'hide_on_screen' => array (
                // 'permalink',
                'the_content',
                'excerpt',
                'custom_fields',
                'discussion',
                'comments',
                'revisions',
                'slug',
                'author',
                'format',
                'featured_image',
                'categories',
                'tags',
                'send-trackbacks',
            ),
        ),
        'menu_order' => 0,
    ));