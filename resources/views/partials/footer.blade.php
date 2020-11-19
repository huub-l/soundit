<footer id="siteFooter" >
    <div class="row expanded">
        <div class="large-2">
            @include('svg.logo-icon')
        </div>

        <div class="large-5">
            <div class="footer__nav">
                @if ($footerNav)
                <nav class="nav-footer">
                    <ul class="nav">
                    @foreach ($footerNav as $item)
                        <li class="menu-item {{ $item->classes ?? '' }}">
                            <a href="{{ $item->url }}" data-scroll-to @if ( strpos($item->classes, 'internal-link') !== false ) data-router-disabled @endif> {{ $item->label }} </a>
                        </li>
                    @endforeach
                    </ul>
                </nav> 
                @endif
    
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
                <form>
                    <label for="newsletter">Stay up to date with our latest innovations</label>
                    <div class="input__wrapper">
                        <input type="email" id="newsletter" name="newsletter" placeholder="Your@Mail.Here">
                        <button class="btn btn-subscribe">Subscribe</button>
                    </div>
                </form>
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