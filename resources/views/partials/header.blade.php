<header id="siteHeader">
  <a class="brand" href="{{ home_url('/') }}"> @include('svg.logo') </a>
  <a class="brand-icon" href="{{ home_url('/') }}"> @include('svg.logo-icon') </a>

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
</header>
