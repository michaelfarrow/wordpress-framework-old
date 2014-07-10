<?php

// See http://melchoyce.github.io/dashicons/ for custom post type icons

// Menu order: (menu_position)

// 5 - below Posts
// 10 - below Media
// 15 - below Links
// 20 - below Pages
// 25 - below comments
// 60 - below first separator
// 65 - below Plugins
// 70 - below Users
// 75 - below Tools
// 80 - below Settings
// 100 - below second separator

// $book = new Custom_Post_Type('Book', array(
	// 'menu_icon' => 'dashicons-book',
	// 'menu_position' => 20,
// ));
// $book->add_taxonomy('author');



// function books_columns($columns)
// {
// 	$new_columns = array(
// 		'author' => __( 'Author' ),
// 		'price' => __( 'Price' ),
// 	);

// 	merge_columns_at_position($columns, $new_columns, -1);

//     return $columns;
// }
// add_filter('manage_book_posts_columns' , 'books_columns');


// function books_books_data( $column, $post_id ) {
	
// 	switch( $column ) {

// 		case 'author' :

// 			print get_field('author');
// 			break;

// 		case 'price' :

// 			print get_field('price') ? column_tick() : '';
// 			break;

// 		default :
// 			break;
// 	}
// }
// add_action( 'manage_book_posts_custom_column', 'books_books_data', 10, 2 );


// function custom_content( $content ) {
// 	$type = get_post_type();

// 	switch ($type) {

// 		case 'book':
// 			return get_field('blurb');
// 			break;
		
// 		default:
// 			return $content;
// 			break;
// 	}
// }
// add_filter( 'the_content', 'custom_content' );

