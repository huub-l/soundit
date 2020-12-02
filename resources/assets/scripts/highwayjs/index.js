import 'whatwg-fetch'
import Highway from '@dogstudio/highway/build/highway.min.js'

import DefaultRenderer from './renderers/Default'
import DefaultTransition from './transitions/Default'
import Home from './renderers/home';
import Private from './renderers/private';

export default class H extends Highway.Core {

    constructor() {

        super({
            renderers: {
              home: Home,
              template_private : Private, 
              template_page: DefaultRenderer,
              template_login: DefaultRenderer,
              single_post: DefaultRenderer
            },
            transitions: {
              default: DefaultTransition
            }
        })

        this.on('NAVIGATE_IN', this.onNavigateIn)

    }

    onNavigateIn({ to, location }) {
        if (!to.page.body.classList.contains('home')) {
            document.querySelectorAll('[data-anchor]').forEach(anchor => {
                anchor.href = window.location.origin + '/' + anchor.dataset.anchor
            });
        }
       
        const menuItems = document.querySelectorAll('.menu-item a')

        // Update Active Nav Link
        for( let i = 0; i < menuItems.length; i++ ) {

            menuItems[i].classList.remove('active')

            if( menuItems[i].href === location.href ) {
                menuItems[i].classList.add('active')
            }
        }

    
        // Update body classes
        document.body.className = to.page.body.className
    }

    attach() {
        this.links = document.querySelectorAll( 'a[href]:not([target]):not([href|="#"]):not([data-router-disabled]):not(.sf-dump-toggle)' )
        for (const link of this.links) {
            link.addEventListener('click', this._navigate);
        }
    }

}
