<div class="hero-wrapper" id="sticky-background">
    <span> @include('svg.icon-scroll') </span>
    <div class="hero__background" data-scroll data-scroll-sticky data-scroll-target="#sticky-background">
        <div class="video-desktop">
            <video autoplay loop playsinline muted>
                <source src="@field('hero_background_desktop', 'url')" type="video/mp4">
            </video> 
        </div>
        <div class="video-mobile">
            <video autoplay loop playsinline muted>
                <source src="@field('hero_background_mobile', 'url')" type="video/mp4">
            </video> 
        </div>
    </div>

    <div class="hero__title">
        <h1 class="heading-one">@field('hero_title')</h1>
        <a data-scroll-to class="btn btn-white" href="@field('hero_link', 'url')" target="@field('hero_link', 'target')">@field('hero_link', 'title')</a>
    </div>
</div>
