{{--
  Template Name: Home
--}}

@extends('layouts.app')

@section('content')
    @include('partials.content-page')

    <div class="home-wrapper">

        <section class="home--hero" id="home-hero">
            <div class="row expanded">
                <div class="column xxlarge-12">
                    <div class="hero-wrapper" id="sticky-background">
                        <span> @include('svg.icon-scroll') </span>
                        <div class="hero__background" data-scroll data-scroll-sticky data-scroll-target="#sticky-background">
                            <img src="@field('hero_background', 'url')" alt="@field('hero_background', 'alt')">
                        </div>

                        <h1 class="heading-one">@field('hero_title')</h1>
                        <a class="btn btn-white" href="@field('hero_link', 'url')" target="@field('hero_link', 'target')">@field('hero_link', 'title')</a>
                        <span></span>
                    </div>
                </div>
            </div>
        </section>

        <section class="home--about" id="home-about">
        <div class="about-logo" data-scroll data-scroll-direction="horizontal" data-scroll-speed="2">
            @include('svg.logo-extended')
            @include('svg.logo-extended')
            @include('svg.logo-extended')
            </div>

        <div class="row expanded">
            <div class="column xxlarge-8 xxlarge-offset-2">
                <div class="about-wrapper">
                        <span class="heading-three-white">@field('about_uppertitle')</span>
                        <h2 class="heading-two-white">@field('about_title')</h2>
                        <p>@field('about_text')</p>

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
        </section>

        @hasfield('infographic_slideshow')
        <section class="home--infographics">
            <div class="row expanded">
                <div class="xxlarge-12">
                    <div class="infographic__slideshow">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                @fields('infographic_slideshow')
                                <div class="swiper-slide">
                                    @fields('slide')
                                    <div class="slide__wrapper">
                                        <div class="slide__text">
                                            <span class="heading-three-white">@sub('uppertitle')</span>
                                            <p>@sub('text')</p>
                                        </div>
                                        <div class="slide__image">
                                            <img src="@sub('image', 'url')" alt="@sub('image', 'alt')">
                                        </div>
                                    </div>
                                    @endfields
                                </div>
                                @endfields
                            </div>
                        </div>

                        <div class="swiper-navigation">
                            <div class="swiper-prev triggers-hover"> @include('svg.icon-arrow') </div>
                            <div class="swiper-pagination"></div>
                            <div class="swiper-next triggers-hover"> @include('svg.icon-arrow') </div>
                        </div>  
                    </div>
                </div>
            </div>
        </section>
        @endfield

        <section class="home--services" id="home-services">
            <span class="heading-three-white">@field('services_uppertitle')</span>
            @hasfield('services_list')
            <div class="row expanded">
                @fields('services_list')
                <div class="column xxlarge-3">
                    <div class="service__wrapper">
                        <h2 class="heading-two-grey">@sub('service')</h2>
                    </div>
                </div>
                @endfields
            </div>
            @endfield
        </section>

        <section class="home--experience panel video" id="home-experience">
            <div class="experience-background" id="video">
            <canvas id="videoCanvas"></canvas>
            </div>

            <div class="experience-wrapper">
                <div class="row expanded">
                    <div class="column xxlarge-5">
                        <span class="heading-three-white">@field('experience_uppertitle')</span>
                        <h2 class="heading-two-white">@field('experience_title')</h2>
                        <p>@field('experience_text')</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="video--banner-one" id="video-one">
            <div class="video-background">
            
                <video src="@field('video_one_background', 'url')" loop autoplay muted>
            </div>
            @hasfield('video_one_title')<h2 class="heading-one">@field('video_one_title')</h2>@endfield
        </section>

        <section class="home--technology" id="home-technology">
            <div class="technology-background"><img src="@field('technology_background', 'url')" alt=""></div>

            <div class="row expanded">
                <div class="column xxlarge-6">
                    <div class="technology-wrapper">
                        <span class="heading-three-white">@field('technology_uppertitle')</span>
                        <h2 class="heading-two-white">@field('technology_title')</h2>
                        <p>@field('technology_text')</p>

                        <div class="technology__image">
                            <img src="@field('technology_image', 'url')" alt="">
                        </div>

                        @hasfield('technology_characteristics')
                        <ul class="technology__characteristics">
                        @fields('technology_characteristics')
                        <li class="btn">
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
        </section>

        <section class="video--banner-two" id="home-two">
            <div class="video-background"><img src="@field('video_two_background', 'url')" alt=""></div>
            @hasfield('video_two_title')<h2 class="heading-one">@field('video_two_title')</h2>@endfield
        </section>

        <section class="home--team" id="home-team">
            <div class="row expanded">
                <div class="column xxlarge-8 xxlarge-offset-2">
                    <div class="team-wrapper">
                        <span class="heading-three-grey">@field('team_uppertitle')</span>
                        <h2 class="heading-two-black">@field('team_title')</h2>
                        <p>@field('team_text')</p>

                        @hasfield('team_members')
                        <ul class="team__members">
                            @fields('team_members')
                            <li>
                                @group('team_member')
                                <h3 class="heading-three-grey">@sub('name')</h3>
                                <p>@sub('description')</p>
                                @endgroup 
                            </li>
                            @endfields
                        </ul>
                        @endfield
                    </div>
                </div>
            </div>
        </section>

        <section class="home--form" id="home-form">
            <div class="row expanded align-bottom">
                <div class="column xxlarge-4 xxlarge-offset-2">
                    <div class="form__hero">
                        <span class="heading-three-white">@field('form_uppertitle')</span>
                        <h2 class="heading-two-white">@field('form_title')</h2>
                        <p>@field('form_text')</p>
                    </div>
                </div>
                <div class="column xxlarge-4">
                    <div class="form__wrapper">
                        <div class="row expanded">
                            <div class="column">
                                <input type="text" placeholder="Name">
                            </div>
                            <div class="column">
                                <input type="text" placeholder="Company">
                            </div>
                        </div>
    
                        <input type="email" placeholder="Your@Mail.Here">
                        <button class="btn btn-black">Schedule A Live Demo</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="video--banner-three" id="video-three">
            <div class="video-background"><img src="@field('video_three_background', 'url')" alt=""></div>
        </section>

    </div>
@endsection
