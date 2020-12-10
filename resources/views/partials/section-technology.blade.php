<div class="technology-background">
    <video src="@field('technology_background', 'url')" autoplay loop playsinline muted>
</div>

<div class="row expanded">
    <div class="column small-10 small-offset-1 xxlarge-6 xxlarge-offset-0">
        <div class="technology-wrapper">
            <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@field('technology_uppertitle')</span>
            <h2 class="heading-two-white" data-scroll data-scroll-call="revealOpacity">@field('technology_title')</h2>
            <p data-scroll data-scroll-call="revealOpacity">@field('technology_text')</p>

            <div class="technology__image" data-scroll data-scroll-call="revealOpacity">
                <img src="@field('technology_image', 'url')" alt="">
            </div>

            @hasfield('technology_characteristics')
            <ul class="technology__characteristics">
            @fields('technology_characteristics')
            <li class="btn" data-scroll data-scroll-call="revealOpacity">
                    @group('characteristic')
                    <h2 class="heading-two-grey">@sub('title')</h2>
                    <span class="heading-three-grey">@sub('subtitle')</span>
                    @endgroup 
                </li>
                @endfields
            </ul>
            @endfield
        </div>
    </div>
</div>