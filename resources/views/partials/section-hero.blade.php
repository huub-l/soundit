<div class="row expanded">
    <div class="column small-12 xxlarge-12">
        <div class="hero-wrapper" id="sticky-background">
            <span> @include('svg.icon-scroll') </span>
            <div class="hero__background" data-scroll data-scroll-sticky data-scroll-target="#sticky-background">
                <img src="@field('hero_background', 'url')" alt="@field('hero_background', 'alt')">
            </div>

            <div class="hero__title">
                <h1 class="heading-one">@field('hero_title')</h1>
                <a data-scroll-to class="btn btn-white" href="@field('hero_link', 'url')" target="@field('hero_link', 'target')">@field('hero_link', 'title')</a>
            </div>
        </div>
    </div>
</div>