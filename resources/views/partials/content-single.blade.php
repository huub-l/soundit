<article @php(post_class())>
  <header>
    <h1 class="entry-title">
      {!! $title !!}
    </h1>
  </header>

  <div class="entry-content">
    @php(the_content())
  </div>
</article>
