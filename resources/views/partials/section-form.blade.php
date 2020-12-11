<div class="row expanded align-bottom">
    <div class="column small-10 small-offset-1 xxlarge-4 xxlarge-offset-2">
        <div class="form__hero">
            <span class="heading-three-white" data-scroll data-scroll-call="revealOpacity">@field('form_uppertitle')</span>
            <h2 class="heading-two-white" data-scroll data-scroll-call="revealOpacity">@field('form_title')</h2>
            <p data-scroll data-scroll-call="revealOpacity">@field('form_text')</p>
        </div>
    </div>
    
    <div class="column small-10 small-offset-1 xxlarge-4 xxlarge-offset-0">
        <form class="form__wrapper" data-form="contact-form" data-loading="false" data-scroll data-scroll-call="revealOpacity">
            <div class="row expanded">
                <div class="column">
                    <input class="required-field" type="text" placeholder="Name" name="contact_form_name">
                </div>
                <div class="column">
                    <input class="required-field" type="text" placeholder="Company" name="contact_form_company">
                </div>
            </div>

            <input type="email" placeholder="Your@Mail.Here" name="contact_form_email">

            <div class="form__submit">
                <button class="btn btn-black" type="submit" data-submit-form="{{'contact-form'}}">Schedule A Live Demo</button>
                <p class="form-feedback">Thanks for getting in touch!</p>
            </div>
        </form>
    </div>
</div>