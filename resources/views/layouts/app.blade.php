<div id="transition"></div>

@include('partials.header')

<div data-scroll-container class="data-scroll-section">
 
  <main class="grid-container" data-router-wrapper>
    <div data-router-view="{{ $templateName }}">
      @yield('content')
    </div>
  </main>
  
</div>

@include('partials.footer')
