<footer id="siteFooter" data-scroll-section>
    <div class="footer--wrapper">
        @include('svg.logo-icon')

        <div class="footer__nav">
            <nav class="nav-footer">
                @if (has_nav_menu('footer_navigation'))
                {!! wp_nav_menu(['theme_location' => 'footer_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
                @endif
            </nav>

            @hasoption('social_links')
            <ul class="nav-social">
                <span>Follow us</span>
                @fields('social_links', 'option')
                    <li> <a href="@sub('url')"><img src="@sub('icon', 'url')" alt="@sub('icon', 'alt')"></a> </li>
                @endfields
            </ul>
            @endoption
        </div>

        <div class="newsletter">

        </div>
    </div>


    <div class="site-copyright" id="gridToggle">Soundid Ldt. Copyright © {{date('Y')}}</div>
</footer>

<div id="grid-debug">
    <div id="grid">
        <div class="row expanded">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
</div>