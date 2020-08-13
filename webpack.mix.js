const mix = require('laravel-mix');
require('@tinypixelco/laravel-mix-wp-blocks');
require('laravel-mix-purgecss');
require('laravel-mix-copy-watched');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Sage application. By default, we are compiling the Sass file
 | for your application, as well as bundling up your JS files.
 |
 */

mix.setPublicPath('./dist')
   .browserSync('warehouse.test');

mix.sass('resources/assets/styles/app.scss', 'styles')
   .sass('resources/assets/styles/editor.scss', 'styles')
   .purgeCss({
     whitelist: [
       require('purgecss-with-wordpress').whitelist,
       './node_modules/locomotive-scroll/dist/locomotive-scroll.css',
     ],
    //  whitelistPatterns: require('purgecss-with-wordpress').whitelistPatterns,
     whitelistPatterns: require('purgecss-with-wordpress').whitelistPatterns,
   });

mix.js('resources/assets/scripts/app.js', 'scripts')
   .blocks('resources/assets/scripts/editor.js', 'scripts')
   .extract();

mix.copyWatched('resources/assets/images/**', 'dist/images')
   .copyWatched('resources/assets/fonts/**', 'dist/fonts');


mix.options({
  processCssUrls: false,
});

mix.sourceMaps(false, 'source-map')
   .version();
