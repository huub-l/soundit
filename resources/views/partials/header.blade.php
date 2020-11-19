<header id="siteHeader">
  <a class="brand" href="{{ home_url('/') }}"> @include('svg.logo') </a>
  <a class="brand-icon" href="{{ home_url('/') }}"> @include('svg.logo-icon') </a>

  @if ($headerNav)
  <nav class="nav-header">
    <ul class="nav">
      @foreach ($headerNav as $item)
        <li class="menu-item {{ $item->classes ?? '' }}">
          <a href="{{ $item->url }}" data-scroll-to  @if ( strpos($item->classes, 'internal-link') !== false ) data-router-disabled @endif> {{ $item->label }} </a>
        </li>
      @endforeach
    </ul>
  </nav> 
  @endif
</header>
