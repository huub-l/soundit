
import DefaultRenderer from './Default';

class Page extends DefaultRenderer {

  onEnter() {
    super.onEnter();
    
    let mainScroll = this.MainController.getScroll();

    // ** Accordion **

    const accordions = document.querySelectorAll('.js-readmore');
    const tabs = document.querySelectorAll('.accordion_tab');

    const openAccordion = (accordion) => {
        const wrapper = accordion.querySelector('.readmore-wrapper'), 
            content = accordion.querySelector('.inner-wrapper');

        accordion.querySelector('.accordion_tab').innerHTML = '<span>-</span> Close'
        wrapper.style.height = content.offsetHeight + "px";
    };

    const closeAccordion = (accordion) => {
        const wrapper = accordion.querySelector('.readmore-wrapper');

        accordion.querySelector('.accordion_tab').innerHTML = '<span>+</span> Read More'
        wrapper.style.height = null;
    };

    accordions.forEach((accordion) => {
        const intro = accordion.querySelector('.accordion_tab');
        const wrapper = accordion.querySelector('.readmore-wrapper');

        intro.onclick = () => {
            if (wrapper.style.height) {
            closeAccordion(accordion);
            } else {
            accordions.forEach((accordion) => closeAccordion(accordion));
            openAccordion(accordion);
            }

            setTimeout( function() { mainScroll.update() }, 300)
        };
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

export default Page;
