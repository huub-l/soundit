<!doctype html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php wp_head(); ?>

    <link rel="apple-touch-icon" sizes="180x180" href="/wp-content/themes/soundit/favicon//apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/wp-content/themes/soundit/favicon//favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/wp-content/themes/soundit/favicon//favicon-16x16.png">
    <link rel="manifest" href="/wp-content/themes/soundit/favicon//site.webmanifest">
  </head>

  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <?php do_action('get_header'); ?>

    <?php echo \Roots\view(\Roots\app('sage.view'), \Roots\app('sage.data'))->render(); ?>

    <?php do_action('get_footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>
