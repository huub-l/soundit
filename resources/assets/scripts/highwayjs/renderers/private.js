
import DefaultRenderer from './Default';
import Swiper, { Navigation, Pagination } from 'swiper';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

class Private extends DefaultRenderer {

  onEnter() {
    super.onEnter();
    
    let mainScroll = this.MainController.getScroll();

    // ** Infographics Slideshow ** 
    Swiper.use([Navigation, Pagination]);

    var infographicsDesktop = new Swiper('.infographic-desktop > .swiper-container', { 
      slidesPerView: 1,
      spaceBetween: 48, 
      autoHeight: true,

      pagination: {
        el: '.infographic-desktop .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + ' triggers-hover">' + (index + 1) + '</span>';
        },
      },
    
      navigation: {
        nextEl: '.infographic-desktop .swiper-next',
        prevEl: '.infographic-desktop .swiper-prev',
      },
    });

    var infographicsMobile = new Swiper('.infographic-mobile > .swiper-container', { 
      slidesPerView: 1,
      spaceBetween: 48, 
      autoHeight: true,

      pagination: {
        el: '.infographic-mobile .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + ' triggers-hover">' + (index + 1) + '</span>';
        },
      },
    
      navigation: {
        nextEl: '.infographic-mobile .swiper-next',
        prevEl: '.infographic-mobile .swiper-prev',
      },
    });


    // ** Team Mobile Slideshow ** 

    let members = document.querySelectorAll('.team__members li'),
      membersIndex = document.querySelectorAll('[data-row]'),
      navPrev = document.querySelector('.team-prev');

    members.forEach(member => {
      if ( member.getAttribute('data-row') == '1' ) {
       member.classList.add('active-member')
      }
    })
    
    function forward() {
      document.querySelector('.team-next').addEventListener('click', function() {
        let currentEl = document.querySelector('.active-member'),
            nextEl;
         
        if (currentEl.dataset.row == membersIndex.length ) {
          nextEl = members[0];
        } else {
          nextEl = currentEl.nextElementSibling;
        }

        currentEl.classList.remove('active-member');
        nextEl.classList.add('active-member');

        if(currentEl.getElementsByClassName('accordion-content')[0].classList.contains('visible')) {
          currentEl.getElementsByClassName('accordion-tab')[0].click();
        }
      })
    }
    forward();
          
    function previous() {
      document.querySelector('.team-prev').addEventListener('click', function() {
        let currentEl = document.querySelector('.active-member'),
          prevEl;

        if (currentEl.dataset.row == 1 ) {
          prevEl = members[members.length - 1]
        } else {
          prevEl = currentEl.previousElementSibling;
        }

        currentEl.classList.remove('active-member');
        prevEl.classList.add('active-member');

        if(currentEl.getElementsByClassName('accordion-content')[0].classList.contains('visible')) {
          currentEl.getElementsByClassName('accordion-tab')[0].click();
        }
      })
    }
    previous();

    
    // ** Frames Animation ** 

    gsap.registerPlugin(ScrollTrigger);
    mainScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
      scrollTop(value) {
        return arguments.length
          ? mainScroll.scrollTo(value, 0, 0)
          : mainScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector('[data-scroll-container]').style.transform
        ? 'transform'
        : 'fixed'
    });

    const canvas = document.getElementById('videoCanvas');
    const context = canvas.getContext('2d');

    const frameCount = 110;
    const currentFrame = (index) => `${this.themeUrl}/resources/assets/images/frames/soundit-${index.toString().padStart(5, '0')}.jpg`;

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }
    };

    const img = new Image();
    img.src = currentFrame(1);
    canvas.width = 590;
    canvas.height = 1080;
    img.onload = function () {
      context.drawImage(img, 0, 0);
    };

    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    };

    gsap.from('.video', {
      scrollTrigger: {
        trigger: '.video',
        scroller: '[data-scroll-container]',
        scrub: true,
        pin: true,
        start: 'top top',
        end: '+=100%',
        onUpdate: (self) => {
          console.log(
            'progress:',
            self.progress.toFixed(3),
            'direction:',
            self.direction,
            'velocity',
            self.getVelocity()
          );

          //const frameIndex = Math.ceil(self.progress * frameCount);
          const frameIndex = Math.min(
            frameCount - 1,
            Math.ceil(self.progress * frameCount)
          );
          console.log(frameIndex);

          requestAnimationFrame(() => updateImage(frameIndex + 1));
        }
      },
      ease: 'none'
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener('refresh', () => mainScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    preloadImages();


    // ** on slideChange **
    infographicsDesktop.on('slideChangeTransitionEnd', function () {
      setTimeout(function() { 
        mainScroll.update()
        ScrollTrigger.refresh();
      }, 50);
    });

    infographicsMobile.on('slideChangeTransitionEnd', function () {
      setTimeout(function() { 
        mainScroll.update()
        ScrollTrigger.refresh();
      }, 50);
    });
  }

  onFirstLoad() {
    super.onFirstLoad();
  }

  onLeave() {
    super.onLeave();
  }

  onEnterCompleted() {
    super.onEnterCompleted()
  }
}

export default Private;
