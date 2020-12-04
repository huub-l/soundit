<div class="row expanded">
    <div class="column small-10 small-offset-1 xxlarge-8 xxlarge-offset-2">
        <div class="team-wrapper">
            <span class="heading-three-grey" data-scroll data-scroll-call="revealOpacity">@field('team_uppertitle')</span>
            <h2 class="heading-two-black" data-scroll data-scroll-call="revealOpacity">@field('team_title')</h2>
            <p data-scroll data-scroll-call="revealOpacity">@field('team_text')</p>

            @hasfield('team_members')
            <div class="team__nav">
                <span class="team-prev">@include('svg.icon-arrow')</span>
                <span class="team-next">@include('svg.icon-arrow')</span>
            </div>

            <ul class="team__members js-parent">
                @fields('team_members')
                <li data-row="{{ get_row_index() }}" class="accordion-wrapper js-accordion" data-scroll data-scroll-call="revealOpacity">
                    <div class="accordion-content">
                        <div class="accordion-child">
                            @group('team_member')
                            <h3 class="heading-three-grey">@sub('name')</h3>
                            <p>@sub('description')</p>
                            @endgroup 
                        </div>
                    </div>

                    <button class="accordion-tab triggers-hover"><span>+</span>Read more</button>
                </li>
                @endfields
            </ul>
            @endfield
        </div>
    </div>
</div>