import gsap from 'gsap'

const PageLoader = {

    timeline: gsap.timeline({
            paused: true
        })
        .fromTo( '#transition', {
            autoAlpha: 0
        }, {
            duration: 0.5,
            autoAlpha: 1,
            immediateRender: false
        }
    ),

    hide() {

        return new Promise( resolve => {

            this.timeline.tweenFromTo( this.timeline.duration(), 0, {
                ease: 'expo.inOut'
            })

            gsap.delayedCall( this.timeline.duration() * 0.4, resolve)
        })
    },

    show() {

        return new Promise( resolve => {

            this.timeline.tweenFromTo( 0, this.timeline.duration(), {
                ease: 'expo.inOut',
                onComplete: resolve
            })
        })
    }

}

export default PageLoader
