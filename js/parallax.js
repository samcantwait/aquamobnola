export const parallax = () => {
    window.addEventListener('scroll', () => {
        const headingMain = document.querySelector('.heading-primary--main');
        const headingSub = document.querySelector('.heading-primary--sub');
        // const nav = document.querySelector('.navigation');
        const headingLower = document.querySelector('.header__title-lower');
        let scrolled = window.pageYOffset;
        let rate = scrolled * 0.5;

        headingMain.style.transform = `translate3d(0, ${rate}px, 0)`;
        // nav.style.transform = `translate3d(0, ${scrolled * 0.75}px, 0)`;
        headingSub.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        headingLower.style.transform = `translate3d(-50%, ${scrolled * 0.5}px, 0)`;
    })
}