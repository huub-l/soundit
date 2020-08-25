<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class App extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        '*',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'siteName' => $this->siteName(),
            'templateName' => $this->templateName()
        ];
    }

    /**
     * Returns the site name.
     *
     * @return string
     */
    public function siteName()
    {
        return get_bloginfo('name', 'display');
    }

    public function templateName() {
      global $template;
      if (is_post_type_archive()) {
          return 'archive_' .get_post_type();
      } elseif (is_single()) {
          return 'single_' . get_post_type();
      } elseif (is_front_page()) {
          return 'home';
      } elseif(is_home()) {
          return 'blog';
      } else {
          return basename( str_replace('-', '_', get_page_template()) ,'.blade.php' );
      }
    }
}
