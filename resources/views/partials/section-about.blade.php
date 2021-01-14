<div class="about-logo" data-scroll data-scroll-direction="horizontal" data-scroll-speed="2" id="scrollAbout">
    @include('svg.logo-extended')
    @include('svg.logo-extended')
    @include('svg.logo-extended')
</div>

<div class="row expanded">
    <div class="column small-10 small-offset-1 xxlarge-8 xxlarge-offset-2">
        <div class="about-wrapper">
                <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@field('about_uppertitle')</span>
                <h2 class="heading-two-white" data-scroll data-scroll-call="revealOpacity">@field('about_title')</h2>
                <p class="about__text" data-scroll data-scroll-call="revealOpacity">@field('about_text') </p>
                
                @hasfield('about_bullets')
                <ul class="about__bullets">
                    <span class="heading-three-white">@field('about_uppertitle_bullets')</span>
                    @fields('about_bullets')
                        @group('bullet')
                        <li>
                            <span style="background:@sub('bullet_color')"></span>
                            <p>@sub('bullet_text')</p>
                        </li>
                        @endgroup
                    @endfields
                </ul>
                @endfield
        </div>
    </div>
</div>