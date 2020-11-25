{{--
  Template Name: Login
--}}

@extends('layouts.app')

@section('content')

    <div class="login--background">
        @include('svg.logo-extended')
        <div class="background__image"><img src="@field('login_background', 'url')" alt="@field('login_background', 'alt')"></div>
        @include('svg.logo-extended')
    </div>

    <section class="login--wrapper">
        <div class="row expanded">
            <div class="xxlarge-6 xxlarge-offset-3">
                <div class="login__content">
                    <h2 class="heading-two-white">@field('login_title')</h2>

                    <form class="login__form">
                        <label class="heading-three-white">Please Enter Your Password</label>
                        <div class="form__group">
                            <input name="password" type="password" class="form__input" placeholder="Your Password" required>
                            <button type="submit">@include('svg.icon-arrow')</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    </section>

@endsection
