import MainController from '../MainController';
import Highway from '@dogstudio/highway/build/highway.min.js'

import AssetLoader from '../AssetLoader'
import PageLoader from '../animations/PageLoader'
import form from '../../components/form';

import lottie from 'lottie-web';
import gsap from "gsap";
import Swipable from '../Swipeable';

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
            // console.log('assets loaded')

            let mainScroll = this.MainController.getScroll();
            let login = document.querySelector('.password-page');

            window.addEventListener('resize', function () { mainScroll.update() });

            window.onload = function() {
                mainScroll.update()
            }
 
            // Update Window Size
            let windowSize;
                windowSize = window.innerWidth;

            window.onresize = function() {
                windowSize = window.innerWidth;
            };
         
            // Viewport vh
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);


            // Max body for login page 
            if( login ) {
                document.body.style.height = '100vh';
                document.body.classList.add('no-scroll');
            }

            //Lottie

            lottie.loadAnimation({
                container: document.getElementById('lottie-stadium'),
                loop: true,
                autoplay: true,
                path: 'https://assets5.lottiefiles.com/packages/lf20_ih2jca47/data.json'
            })

            
 
            // Cursor 
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

            // Icon scroll to top
            let headerIcon = document.querySelector('.brand-icon'), 
                footerIcon = document.querySelector('.footer-icon'),
                hero = document.querySelector('.js-hero');

            headerIcon.addEventListener('click', function() {
                mainScroll.scrollTo(hero);
            })

            footerIcon.addEventListener('click', function() {
                mainScroll.scrollTo(hero);
            })

            if( ! document.body.classList.contains('password-protected') ) {
                // Froms
                form('contact-form')
                form('newsletter')

                // console.log('this is the size' + windowSize)

                // Header fixed
                if (windowSize > 1023) {
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
            
                // Burger menu 
                if (window.matchMedia('(max-width: 1023px)').matches) {
                    let burger = document.querySelector('.burger-menu'),
                        nav = document.querySelector('.nav-header');

                    burger.addEventListener('click', (ev) => {
                        ev.preventDefault();

                        burger.classList.toggle('open');
                        nav.classList.toggle('visible');
                        document.body.classList.toggle('no-scroll');
                    });

                    let menuItem = document.querySelectorAll('header .menu-item a');

                    menuItem.forEach(item => {
                        item.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            burger.click();
                        })
                    })          
                }

                // Margin for footer
                if (window.matchMedia('(min-width: 1024px)').matches) {
                    let footer = document.querySelector('#siteFooter'),
                        footerHeight = footer.offsetHeight,
                        fakeFooter = document.querySelector('.fake-footer');

                    fakeFooter.style.height = ''+footerHeight+'px';
                    setTimeout(function() { mainScroll.update() }, 300);

                    window.addEventListener('resize', function () {
                        footerHeight = footer.offsetHeight;

                        fakeFooter.style.height = ''+footerHeight+'px';
                        setTimeout(function() { mainScroll.update() }, 300);
                    });
                }

                document.querySelectorAll('[data-anchor').forEach(anchor => {
                    anchor.addEventListener('click', (ev) => {
                    ev.preventDefault()
            
                    let url = anchor.dataset.anchor;
            
                    mainScroll.scrollTo(url, {offset: -50})
                    mainScroll.update()
                    })
                })
                
                // Accordion
                const accordions = document.querySelectorAll('.js-accordion'),
                    tabs = document.querySelectorAll('.accordion-tab'),
                    parent = document.querySelector('.js-parent');


                const openAccordion = (accordion) => {
                    const wrapper = accordion.querySelector('.accordion-content'), 
                        content = accordion.querySelector('.accordion-child');

                    accordion.querySelector('.accordion-tab').innerHTML = '<span>-</span> Close';
                    wrapper.classList.add('visible');
                    wrapper.style.height = content.offsetHeight + "px";

                    if(parent) { parent.style.height = content.offsetHeight + "px"; }
                };

                const closeAccordion = (accordion) => {
                    const wrapper = accordion.querySelector('.accordion-content');

                    accordion.querySelector('.accordion-tab').innerHTML = '<span>+</span> Read More';
                    wrapper.classList.remove('visible');
                    wrapper.style.height = null;

                    if(parent) { parent.style.height = '20vh'; }
                };

                accordions.forEach((accordion) => {
                    const intro = accordion.querySelector('.accordion-tab');
                    const wrapper = accordion.querySelector('.accordion-content');

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


                // Team Mobile Slideshow 
                let members = document.querySelectorAll('.team__members li'),
                    membersIndex = document.querySelectorAll('[data-row]');

                members.forEach(member => {
                    if ( member.getAttribute('data-row') == '1' ) {
                    member.classList.add('active-member')
                    }
                })

                function parentHeight() {
                    let currentEl = document.querySelector('.active-member'), 
                        membersParent = document.querySelector('.team__members'),
                        currentHeight = currentEl.offsetHeight;

                    membersParent.style.height = currentHeight + 'px';
                }  

                if( windowSize < 1023 ) { parentHeight(); }

                function forward() {
                    document.querySelector('.team-next').addEventListener('click', function() {
                        let currentEl = document.querySelector('.active-member'),
                            updateIndex = document.querySelector('.team__index span'),
                            nextEl;
                        
                        if (currentEl.dataset.row == membersIndex.length ) {
                            nextEl = members[0];
                        } else {
                            nextEl = currentEl.nextElementSibling;
                        }

                        currentEl.classList.remove('active-member');
                        nextEl.classList.add('active-member');
                        updateIndex.innerHTML = nextEl.dataset.row;

                        parentHeight();
                    })
                }
                forward();
                        
                function previous() {
                    document.querySelector('.team-prev').addEventListener('click', function() {
                        let currentEl = document.querySelector('.active-member'),
                            updateIndex = document.querySelector('.team__index span'),
                            prevEl;

                        if (currentEl.dataset.row == 1 ) {
                            prevEl = members[members.length - 1]
                        } else {
                            prevEl = currentEl.previousElementSibling;
                        }

                        currentEl.classList.remove('active-member');
                        prevEl.classList.add('active-member');
                        updateIndex.innerHTML = prevEl.dataset.row;

                        parentHeight();
                    })
                }
                previous();

                parent.addEventListener('swiped-left', function() {
                   console.log('swiped left')
                   document.querySelector('.team-next').click();
                });

                parent.addEventListener('swiped-right', function() {
                    console.log('swiped right')
                    document.querySelector('.team-prev').click();
                });

        
                // Team ShowMore Accordion 
                let teamShowmoreTab = document.querySelector('.team__showmore-tab');

                if(teamShowmoreTab) {
                    teamShowmoreTab.addEventListener('click', function() {
                        members.forEach(member => { member.classList.toggle('team__showmore') });

                        if (teamShowmoreTab.innerHTML === '<span>+</span>Show more') {
                            teamShowmoreTab.innerHTML = '<span>-</span>Close';
                        } else {
                            teamShowmoreTab.innerHTML = '<span>+</span>Show more';
                        }

                        setTimeout( function() { mainScroll.update() }, 300);
                    })
                }
            }


            // Text Animation
            mainScroll.on('call', (value, way, obj) => {
            switch (value) {
                case 'revealOpacity': 
                if(! obj.el.classList.contains('animated')) {
                    let element = obj.el;

                    gsap.from(element, {
                        duration: 1.5,
                        y: 50,
                        opacity: 0,
                        ease: 'power3.out',
                    });

                    obj.el.classList.add('animated')
                }
                break;

                case 'showVideo': 
                let videoA = document.querySelector('.experience__one'),
                    videoB = document.querySelector('.experience__two');

                gsap.from(videoA, {
                    duration: 6,
                    opacity: 1,
                    ease: 'power3.out',
                });

                gsap.from(videoB, {
                    duration: 6,
                    opacity: 0,
                    ease: 'power3.out',
                });
                break;
            }
            });  
        })
    }

    onFirstLoad() {
        this.loadScripts(true)
        this.onEnter()
        AssetLoader.loaded.then(() => {
            // console.log('loader')
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
