{{--
  Template Name: Page
--}}

@extends('layouts.app')

@section('content')
    <section class="page--hero">
        <div class="row expanded">
            <div class="small-10 small-offset-1 xxlarge-8 xxlarge-offset-2">
                <h1 class="heading-one">@title</h1>
            </div>
        </div>
    </section>

    <section class="page--content">
        <div class="row expanded">
            <div class="small-10 small-offset-1 xxlarge-8 xxlarge-offset-2">
                <div class="content__wrapper">
                   @content
                </div>
            </div>
        </div>
    </section>
@endsection
