<span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@field('services_uppertitle')</span>

@hasfield('services_list')
<div class="row expanded">
    @fields('services_list')
    <div class="column small-12 xxlarge-3">
        <div class="service__wrapper" data-scroll data-scroll-call="revealOpacity">
            <h2 class="heading-two-grey">@sub('service')</h2>
        </div>
    </div>
    @endfields
</div>
@endfield