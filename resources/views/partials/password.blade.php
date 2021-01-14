<div class="password-page">
    <div class="login--background">
        <div class="login__background"><video src="@field('login_background', 'url')" autoplay loop playsinline muted></div>
    </div>

    <section class="login--wrapper">
        <div class="row expanded">
            <div class="small-10 small-offset-1 xxlarge-6 xxlarge-offset-3">
                <div class="login__content">
                    <h2 class="heading-two-white">@field('login_title')</h2>

                    <form action="<?php echo esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ); ?>" method="post" class="login__form">
                        <label for="post_password" class="heading-three-white">Please Enter Your Password</label>
                        <div class="form__group">
                            <input name="post_password" type="password" class="form__input" placeholder="Your Password" required>
                            <button type="submit">@include('svg.icon-arrow')</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>