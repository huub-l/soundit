<header id="siteHeader">
  <a class="brand" href="{{ home_url('/') }}"> @include('svg.logo') </a>
  <a class="brand-icon" href="{{ home_url('/') }}"> @include('svg.logo-icon') </a>

  <nav class="nav-header">
    @if (has_nav_menu('header_navigation'))
      {!! wp_nav_menu(['theme_location' => 'header_navigation', 'menu_class' => 'nav', 'echo' => false]) !!}
    @endif
  </nav>
</header>
