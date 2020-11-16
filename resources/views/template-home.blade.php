{{--
  Template Name: Home
--}}

@extends('layouts.app')

@section('content')
    @include('partials.content-page')

    <section class="home--hero">
        <div class="row expanded">
            <div class="large-12">
                <div class="hero-wrapper" id="sticky-background">
                    <span></span>
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

    <section class="home--about">
       <div class="about-logo" data-scroll data-scroll-direction="horizontal" data-scroll-speed="2">
           @include('svg.logo-extended')
           @include('svg.logo-extended')
           @include('svg.logo-extended')
        </div>

       <div class="row expanded">
           <div class="large-8 large-offset-2">
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

    <section class="home--experience">
       <div class="experience-background"> <img src="@field('experience_background', 'url')" alt=""> </div>

       <div class="experience-wrapper">
        <div class="row expanded">
            <div class="large-5">
                <span class="heading-three-white">@field('experience_uppertitle')</span>
                <h2 class="heading-two-white">@field('experience_title')</h2>
                <p>@field('experience_text')</p>
            </div>
        </div>
       </div>
    </section>

    <section class="video--banner-one">
        <div class="video-background">
        
            <video src="@field('video_one_background', 'url')" loop autoplay muted>
        </div>
        @hasfield('video_one_title')<h2 class="heading-one">@field('video_one_title')</h2>@endfield
    </section>

    <section class="home--technology">
        <div class="technology-background"><img src="@field('technology_background', 'url')" alt=""></div>

        <div class="row expanded">
            <div class="large-6">
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

    <section class="video--banner-two">
        <div class="video-background"><img src="@field('video_two_background', 'url')" alt=""></div>
        @hasfield('video_two_title')<h2 class="heading-one">@field('video_two_title')</h2>@endfield
    </section>

    <section class="home--team">
        <div class="row expanded">
            <div class="large-8 large-offset-2">
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

    <section class="home--form">
        <div class="row expanded">
            <div class="large-4 large-offset-2">
                <div class="form__hero">
                    <span class="heading-three-white">@field('form_uppertitle')</span>
                    <h2 class="heading-two-white">@field('form_title')</h2>
                    <p>@field('form_text')</p>
                </div>
            </div>
            <div class="large-4">
                <div class="form__wrapper">

                </div>
            </div>
        </div>
    </section>

    <section class="video--banner-three">
        <div class="video-background"><img src="@field('video_three_background', 'url')" alt=""></div>
    </section>
@endsection
