{{--
  Template Name: Private
--}}

@extends('layouts.app')

@if( post_password_required() ) 
    @include('partials.password')
@else 

@section('content')
    @include('partials.content-page')

    <div class="home-wrapper">
        <section class="home--hero" id="home-hero">
           @include('partials.section-hero')
        </section>

        <section class="home--about" id="home-about">
           @include('partials.section-about')
        </section>

        <section class="home--infographics">
            <div class="row expanded">
                <div class="small-12 xxlarge-12">
                   @include('partials.section-infographics')
                </div>
            </div>
        </section>
       
        <section class="home--experience panel video" id="home-experience">
            @include('partials.section-experience')
        </section>

        <section class="video--banner-one" id="video-one">
            <div class="video-background">
                <video src="@field('video_one_background', 'url')" autoplay loop playsinline muted>
            </div>
            @hasfield('video_one_title')<h2 class="heading-one">@field('video_one_title')</h2>@endfield
        </section>

        <section class="home--technology" id="home-technology">
            @include('partials.section-technology')
        </section>

        <section class="video--banner-two" id="home-two">
            <div class="video-background"><img src="@field('video_two_background', 'url')" alt=""></div>
            @hasfield('video_two_title')<h2 class="heading-one">@field('video_two_title')</h2>@endfield
        </section>

        <section class="home--team" id="home-team">
           @include('partials.section-team')
        </section>

        <section class="home--form" id="home-form">
            @include('partials.section-form')
        </section>

        <section class="video--banner-three" id="video-three">
            <div class="video-background"><img src="@field('video_three_background', 'url')" alt=""></div>
        </section>
    </div>
@endsection

@endif


