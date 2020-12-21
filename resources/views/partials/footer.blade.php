<footer id="siteFooter" >
    <div class="row expanded">
        <div class="small-10 small-offset-1 xxlarge-2 xxlarge-offset-0">
            @include('svg.logo-icon')
        </div>

        <div class="small-10 small-offset-1 xxlarge-5 xxlarge-offset-0">
            <div class="footer__nav">
                @if ($footerNav)
                <nav class="nav-footer">
                    <ul class="nav">
                    @foreach ($footerNav as $item)
                        <li class="menu-item {{ $item->classes ?? '' }}">
                            <a @if($item->classes ?? 'internal-link') data-anchor="{{ $item->url }}" data-scroll-to @else href="{{ $item->url }}" @endif > {{ $item->label }} </a>
                        </li>
                    @endforeach
                    </ul>
                </nav> 
                @endif
    
                @hasoption('social_links')
                <ul class="nav-social">
                    <span>@option('social_media_title')</span>
                    @fields('social_links', 'option')
                        <li> <a href="@sub('url')"><img src="@sub('icon', 'url')" alt="@sub('icon', 'alt')"></a> </li>
                    @endfields
                </ul>
                @endoption
            </div>    
        </div>

        <div class="small-10 small-offset-1 xxlarge-4 xxlarge-offset-1">
            <div class="newsletter">
                <form data-form="newsletter" data-loading="false" >
                    <label for="newsletter_email">@option('newsletter_title')</label>
                    <div class="input__wrapper">
                        <input class="required-field" type="email" name="newsletter_email" placeholder="Your@Mail.Here">
                        <button class="btn btn-subscribe" type="submit" data-submit-form="{{'newsletter'}}">Subscribe</button>
                    </div>
                    <p class="form-feedback">Added with success!</p>
                </form>
            </div>
        </div>
    </div>

    <div class="row expanded">
        <div class="small-12 xxlarge-12">
            <div class="site-copyright" id="gridToggle">{{date('Y')}} Soundit Ltd. All rights reserved.</div>
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