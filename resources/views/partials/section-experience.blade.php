<div class="experience-background" id="video">
    <div class="experience__one">
        <video autoplay loop playsinline muted>
            <source src="@field('video_experience_a', 'url')" type="video/mp4">
        </video>      
    </div>
    <div class="experience__two">
        <video autoplay loop playsinline muted>
            <source src="@field('video_experience_b', 'url')" type="video/mp4">
        </video>    
    </div>
</div>

<div class="experience-wrapper">
    <div class="row expanded">
        <div class="column small-10 small-offset-1 xxlarge-5 xxlarge-offset-0">
            <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@field('experience_uppertitle')</span>
            <h2 class="heading-two-white" data-scroll data-scroll-call="revealOpacity">@field('experience_title')</h2>
            <p data-scroll data-scroll-call="showVideo">@field('experience_text')</p>
        </div>
    </div>
</div>