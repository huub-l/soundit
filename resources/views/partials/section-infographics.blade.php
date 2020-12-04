{{-- Infographics Desktop --}}

<div class="infographic__slideshow infographic-desktop">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            @fields('infographic_slideshow')
                @set ($location , get_sub_field('mobile_desktop'))
                @if( in_array('desktop', $location) )
                    <div class="swiper-slide">
                        @fields('slide')
                            <div class="slide__wrapper">
                                <div class="slide__text">
                                    <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@sub('uppertitle')</span>
                                    <p data-scroll data-scroll-call="revealOpacity">@sub('text')</p>
                                </div>
                                <div class="slide__image">
                                    <img class="img_desktop" src="@sub('image_desktop', 'url')" alt="@sub('image_desktop', 'alt')">
                                </div>
                            </div>
                        @endfields
                    </div>
                @endif
            @endfields
        </div>
    </div>

    <div class="swiper-navigation">
        <div class="swiper-prev triggers-hover"> @include('svg.icon-arrow') </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-next triggers-hover"> @include('svg.icon-arrow') </div>
    </div>  
</div>

{{-- Infographics Mobile --}}

<div class="infographic__slideshow infographic-mobile">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            @fields('infographic_slideshow') 
                @set ($location , get_sub_field('mobile_desktop'))
                @if( in_array('mobile', $location) )
                <div class="swiper-slide">
                    @fields('slide')
                        <div class="slide__wrapper">
                            <div class="slide__text">
                                <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@sub('uppertitle')</span>
                                <p data-scroll data-scroll-call="revealOpacity">@sub('text')</p>
                            </div>
                            <div class="slide__image" data-scroll data-scroll-call="revealOpacity">
                                <img class="img_mobile" src="@sub('image_mobile', 'url')" alt="@sub('image_mobile', 'alt')">
                            </div>
                        </div>
                    @endfields
                </div>
                @endif
            @endfields
        </div>
    </div>

    <div class="swiper-navigation" data-scroll data-scroll-call="revealOpacity">
        <div class="swiper-prev triggers-hover"> @include('svg.icon-arrow') </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-next triggers-hover"> @include('svg.icon-arrow') </div>
    </div>  
</div>