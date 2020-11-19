<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use Log1x\Navi\Facades\Navi;

class Navigation extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.header',
        'partials.footer',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'headerNav' => $this->headerNav(),
            'footerNav' => $this->footerNav(),
        ];
    }

     /**
     * Returns the primary navigation.
     *
     * @return array
     */
    public function headerNav()
    {
        if (Navi::build('header_navigation')->isEmpty()) {
            return;
        }

        return Navi::build('header_navigation')->toArray();
    }

    /**
     * Returns the footer navigation.
     *
     * @return array
     */
    public function footerNav()
    {
        if (Navi::build('footer_navigation')->isEmpty()) {
            return;
        }
        
        return Navi::build('footer_navigation')->toArray();
    }
}

