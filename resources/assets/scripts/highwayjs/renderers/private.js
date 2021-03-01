
import DefaultRenderer from './Default';
import Swiper, { Navigation, Pagination } from 'swiper';
import SwiperCore, { EffectFade } from 'swiper';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

class Private extends DefaultRenderer {
  onEnter() {
    super.onEnter();
    
    let mainScroll = this.MainController.getScroll();

    // ** Infographics Slideshow ** 
    Swiper.use([Navigation, Pagination]);
    SwiperCore.use([EffectFade]);

    var infographicsDesktop = new Swiper('.infographic-desktop > .swiper-container', { 
      fadeEffect: { crossFade: true },
      slidesPerView: 1,
      spaceBetween: 48,
      effect: 'fade',

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
