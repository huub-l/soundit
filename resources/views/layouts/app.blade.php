<div id="transition"></div>
<div data-scroll-container>
  @include('partials.header')
  <main class="grid-container" data-scroll-section data-router-wrapper>
    <div data-router-view="{{ $templateName }}">
      @yield('content')
    </div>
  </main>
  @include('partials.footer')
</div>
