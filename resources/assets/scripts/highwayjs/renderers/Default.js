import MainController from '../MainController';
import Highway from '@dogstudio/highway/build/highway.min.js'

import AssetLoader from '../AssetLoader'
import PageLoader from '../animations/PageLoader'

export default class DefaultRenderer extends Highway.Renderer {
  constructor(properties) {
    // pass properties into constructor of parent class
    super(properties);

    // initialize class variables
    this.MainController = new MainController();
    this.themeUrl = site_info.templateUrl;
  }

    onEnter() {
        this.loadScripts()

        this.MainController.init();

        AssetLoader.load( { element: this.properties.view } ).then( () => {

            console.log('assets loaded')

            let mainScroll = this.MainController.getScroll();

            window.addEventListener('resize', function () { mainScroll.update() });
        
            // Viewport vh
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

        
            //cursor 

            const cursor = document.querySelector('#cursor');
            let links = document.querySelectorAll('a, button, .triggers-hover');

            document.addEventListener('mousemove', e => {
                cursor.style.left = e.pageX + 'px';
                cursor.style.top = e.pageY + 'px';
            });

            links.forEach(function(link) {
                link.addEventListener('mouseover', function hover() {
                    cursor.classList.add('cursor-link')
                    return false;
                });
                
                link.addEventListener('mouseleave', function leave() {
                    cursor.classList.remove('cursor-link')
                    return false;
                });
            });


            // Header fixed
            if (window.matchMedia('(min-width: 1023px)').matches) {
                mainScroll.on('scroll', function(instance) {
                    let y = instance.scroll.y,
                    header = document.querySelector('#siteHeader'),
                    heroHeight = document.querySelector('#siteHeader').offsetHeight;
                
                    if (y >= heroHeight) {
                    header.classList.add('fixed');
                    } else {
                    header.classList.remove('fixed');
                    }    
                });
            }

            // Margin for footer

            let footer = document.querySelector('#siteFooter'),
                footerHeight = footer.offsetHeight,
                main = document.querySelector('.grid-container');

            main.style.padding = '0 0 '+footerHeight+'px';
            mainScroll.update();


            document.querySelectorAll('[data-anchor').forEach(anchor => {
                anchor.addEventListener('click', (ev) => {
                  ev.preventDefault()
          
                  let url = anchor.dataset.anchor;
          
                  mainScroll.scrollTo(url, {offset: -50})
                  mainScroll.update()
                })
            })

            
            // Accordion

            const accordions = document.querySelectorAll('.js-accordion');
            const tabs = document.querySelectorAll('.accordion-tab');

            const openAccordion = (accordion) => {
                const wrapper = accordion.querySelector('.accordion-content'), 
                    content = accordion.querySelector('.accordion-content > p');

                accordion.querySelector('.accordion-tab').innerHTML = '<span>-</span> Close';
                wrapper.classList.add('hide');
                wrapper.style.height = content.offsetHeight + "px";
            };

            const closeAccordion = (accordion) => {
                const wrapper = accordion.querySelector('.accordion-content');

                accordion.querySelector('.accordion-tab').innerHTML = '<span>+</span> Read More';
                wrapper.classList.remove('hide');
                wrapper.style.height = null;
            };

            accordions.forEach((accordion) => {
                const intro = accordion.querySelector('.accordion-tab');
                const wrapper = accordion.querySelector('.accordion-content');

                intro.onclick = () => {
                    console.log('clicked')
                    if (wrapper.style.height) {
                    closeAccordion(accordion);
                    } else {
                    accordions.forEach((accordion) => closeAccordion(accordion));
                    openAccordion(accordion);
                    }

                    setTimeout( function() { mainScroll.update() }, 300)
                };
            });
        })
    }

    onFirstLoad() {
        this.loadScripts(true)
        this.onEnter()
        AssetLoader.loaded.then(() => {
            console.log('loader')
            PageLoader.hide().then( () => {
                this.onEnterCompleted()
            })
        })
    }

    onEnterCompleted() {

    }

    onLeave() {
        this.MainController.destroy()
    }

    onLeaveCompleted() {

    }

    setup() {
        this.onFirstLoad()
    }

    loadScripts( firstLoad ) {

        this.reloadScripts = [] // scripts to reload every time

        const scripts = this.properties.view.querySelectorAll('script')
        const scriptsLength = scripts.length

        for( let i = 0; i < scriptsLength; i++ ) {

            const code = scripts[i].innerText
            const src = scripts[i].src

            if ( !firstLoad && code.length > 0 ) {
                // TODO: test adding script to page with innerHTML
                window.eval(code) // eslint-disable-line
            } else if( src.length > 0) {

                // TODO: resolve when all scripts are loaded
                this.appendScript( src, src.split('/').pop(), firstLoad )
                    .catch(error => { console.log(error) })

            }
        }
    }

    appendScript( src, filename, firstLoad ) {

        return new Promise((resolve, reject) => {

            if( !!document.querySelector(`[data-filename="${filename}"]`) ) return

            const script = document.createElement('script')

            // don't cache certain scripts
            if( !this.reloadScripts.includes( filename ) ) {
                script.dataset.filename = filename
            }

            if( !firstLoad ) {
                script.async = true
                script.src = src
                script.addEventListener('load', resolve)
                script.addEventListener('error', () => reject('Error loading script: ' + filename))
                script.addEventListener('abort', () => reject('Script loading aborted: ' + filename))
            }

            document.body.appendChild(script)

        })
    }

}
