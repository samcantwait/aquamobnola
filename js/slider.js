export const slider = () => {
    const events = document.querySelectorAll('.happenings__event');
    const next = document.querySelector('.happenings__btn--right');
    const prev = document.querySelector('.happenings__btn--left');
    const container = document.querySelector('.happenings__container')

    let curSlide = 0;

    window.addEventListener('resize', getEventsWidth);

    let eventsWidth, containerWidth, slidesDisplayed;
    function getEventsWidth() {
        containerWidth = container.getBoundingClientRect().width;
        eventsWidth = containerWidth > 737 ? '25%' : containerWidth > 510 ? '33.333333333%' : containerWidth > 299 ? '50%' : '100%';
        slidesDisplayed = containerWidth > 737 ? 4 : containerWidth < 510 ? 2 : 3;
        events.forEach(event => {
            event.style.flex = `1 0 ${eventsWidth}`;
        })
    }
    getEventsWidth();

    function slide(distance) {
        events.forEach((event, index) => {
            event.style.transform = `translateX(${(100 * (index - distance)) / containerWidth}%)`;
        })
    }
    slide(0);

    next.addEventListener('click', e => {
        curSlide = curSlide + slidesDisplayed >= events.length ? 0 : curSlide + slidesDisplayed;
        slide(curSlide * containerWidth);
        console.log(curSlide)
    })

    prev.addEventListener('click', e => {
        curSlide = curSlide <= 0 ? (events.length % slidesDisplayed === 0 ? events.length - slidesDisplayed : events.length - events.length % slidesDisplayed) : curSlide - slidesDisplayed;
        slide(curSlide * containerWidth);
        console.log('complex: ', events.length - events.length % slidesDisplayed)
        console.log('slides displayed: ', slidesDisplayed)
        console.log(curSlide)
    })

}