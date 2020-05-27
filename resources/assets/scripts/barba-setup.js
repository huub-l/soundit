import barba from '@barba/core';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

let scroll;

function smooth(container) {
  scroll = new LocomotiveScroll({
    el: container.querySelector('[data-scroll-container]'),
    smooth: true,
  });
}

export default function barbaInit() {

  barba.init({
    transitions: [{
      name: 'default',
      once({ next }) {
        smooth(next.container);
      },
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.3,
          ease: 'power4.out',
        });
      },
      beforeEnter({ next }) {

        // destroy the previous scroll
        scroll.destroy();

        // init LocomotiveScroll regarding the next page
        smooth(next.container);
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.3,
          ease: 'power4.out',
        });
      },
    }],
  });
}

