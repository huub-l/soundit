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

// Add Class if Password protected

add_filter( 'body_class', 'add_password_protected_body_class' );
function add_password_protected_body_class( $classes ) {
if ( post_password_required() ) 
   $classes[] = 'password-protected';
   return $classes;
}


// Wrong password warning 

function check_post_pass() {

    if ( ! is_single() || ! post_password_required() ) {
        return;
    }

    if ( isset( $_COOKIE['wp-postpass_' . COOKIEHASH ] ) ) {
        define( 'INVALID_POST_PASS', true );

        // Tell the browser to remove the cookie so the message doesn't show up every time
        setcookie( 'wp-postpass_' . COOKIEHASH, NULL, -1, COOKIEPATH );
    }
}

add_action( 'wp', 'check_post_pass' );