@include('partials.header')
<main data-barba="container" class="main grid-container" data-barba-namespace="{{ $templateName }}">
  <div data-scroll-container>
     @yield('content')
  </div>
</main>
@include('partials.footer')
