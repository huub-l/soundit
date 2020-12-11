<?php

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/

if (! file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/

collect(['helpers', 'setup', 'filters', 'admin', 'clean-wordpress', 'forms'])
    ->each(function ($file) {
        $file = "app/{$file}.php";

        if (! locate_template($file, true, true)) {
            wp_die(
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });

/*
|--------------------------------------------------------------------------
| Enable Sage Theme Support
|--------------------------------------------------------------------------
|
| Once our theme files are registered and available for use, we are almost
| ready to boot our application. But first, we need to signal to Acorn
| that we will need to initialize the necessary service providers built in
| for Sage when booting.
|
*/

add_theme_support('sage');

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We are ready to bootstrap the Acorn framework and get it ready for use.
| Acorn will provide us support for Blade templating as well as the ability
| to utilize the Laravel framework and its beautifully written packages.
|
*/

new Roots\Acorn\Bootloader();


// Options Page

if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}


// //  Export Emails to CSV

// function custom_table_csv_pull() {
//     global $wpdb;

//     $filename = 'email_csv';
//     $date = date("Y-m-d H:i:s");
//     $output = fopen('php://output', 'w');
//     $result = $wpdb->get_results('SELECT * FROM     wp_get_directions_form', ARRAY_A);
//     fputcsv( $output, array('id', 'email'));
//     foreach ( $result as $key => $value ) {
//         $modified_values = array(
//         $value['id'],
//         $value['email']
//         );
//         fputcsv( $output, $modified_values );
//     }
//     header("Pragma: public");
//     header("Expires: 0");
//     header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
//     header("Cache-Control: private", false);
//     header('Content-Type: text/csv; charset=utf-8');
//     header("Content-Disposition: attachment; filename=\"" . $filename . " " . $date . ".csv\";" );
//     header("Content-Transfer-Encoding: binary");
//     exit;
// }

// add_action('wp_ajax_csv_pull','custom_table_csv_pull');
// add_action('admin_menu', 'add_export_button');

// function add_export_button() {
//     add_menu_page( 'Export Emails', 'Export Emails', 'manage_options', 'custom_admin_page_slug', 'pg_building_function','',3 );
// }

// function pg_building_function() {
// 	$ajax_url = admin_url('admin-ajax.php?action=csv_pull');
//     echo "<script>window.open('".$ajax_url."');</script>";
//     exit;
// }