import LocomotiveScroll from 'locomotive-scroll';

let mainScroll;

export default class MainController {
	init() {
		mainScroll = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
			getDirection: true,
		});	
	}

	updateScroll() {
		mainScroll.update();
    }

	getScroll() {
		return mainScroll;
    }

	destroy() {
		mainScroll.destroy();
    }
}
