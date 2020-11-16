<footer id="siteFooter">
    <div class="row expanded">
        <div class="large-2">
            @include('svg.logo-icon')
        </div>

        <div class="large-5">
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
        </div>

        <div class="large-4 large-offset-1">
            <div class="newsletter">

            </div>
        </div>
    </div>

    <div class="row expanded">
        <div class="large-12">
            <div class="site-copyright" id="gridToggle">Soundid Ldt. Copyright © {{date('Y')}}</div>
        </div>
    </div>
</footer>

<div id="grid-debug">
    <div id="grid">
        <div class="row expanded">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    </div>
</div>