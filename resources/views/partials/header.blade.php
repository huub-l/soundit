<header id="siteHeader">
  <a class="brand" href="{{ home_url('/') }}"> @include('svg.logo') </a>
  <span class="brand-icon triggers-hover"> @include('svg.logo-icon') </span>

  @if ($headerNav)
  <nav class="nav-header">
    <ul class="nav">
      @foreach ($headerNav as $item)
        <li class="menu-item {{ $item->classes ?? '' }}">
          <a data-anchor="{{ $item->url }}" data-scroll-to> {{ $item->label }} </a>
        </li>
      @endforeach
    </ul>
  </nav> 
  @endif

  <div class="burger-menu">
    <span></span>
    <span></span>
    <span></span>
  </div>
</header>
