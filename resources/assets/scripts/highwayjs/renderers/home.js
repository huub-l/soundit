
import DefaultRenderer from './Default';

class Home extends DefaultRenderer {

  onEnter() {
    super.onEnter();

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
