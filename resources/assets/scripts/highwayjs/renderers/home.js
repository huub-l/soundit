
import DefaultRenderer from './Default';
import Swiper, { Navigation, Pagination } from 'swiper';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

class Home extends DefaultRenderer {

  onEnter() {
    super.onEnter();
    
    let mainScroll = this.MainController.getScroll();

    // ** Infographics Slideshow ** 
    Swiper.use([Navigation, Pagination]);

    var infographicsSwiper = new Swiper('.infographic__slideshow > .swiper-container', { 
      slidesPerView: 1,
      spaceBetween: 48, 
      autoHeight: true,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + ' triggers-hover">' + (index + 1) + '</span>';
        },
      },
    
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    });

    infographicsSwiper.on('slideChange', function () {
      setTimeout( function() { mainScroll.update() }, 500)
    });
  

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

export default Home;
