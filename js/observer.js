export const observer = () => {

    //Add observer to the show section so that the photos appear from below as the user scrolls into the section.
    const sectionShow = document.querySelector('.section-show');
    const photos = document.querySelectorAll('.show__photos');

    const moveUp = (entries, showObserver) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > .05) {
                photos.forEach((photo, index) => {
                    if (index === 1) {
                        setTimeout(() => {
                            photo.style.transform = 'translateY(0)';
                        }, 300)
                    }
                    if (index === 0) {
                        setTimeout(() => {
                            photo.style.transform = 'translateY(0)';
                        }, 100)
                    }
                    if (index === 2) {
                        setTimeout(() => {
                            photo.style.transform = 'translateY(0)';
                        }, 600)
                    }
                })
                showObserver.unobserve(entry.target);
            }
        })
    }

    const showObserver = new IntersectionObserver(moveUp, {
        root: null,
        threshold: .2,
    });

    showObserver.observe(sectionShow);


    //Add an observer to the mobsters section so that the cast bios appear from the side as the user scrolls into the section.
    const sectionMobsters = document.querySelector('.section-mobsters');
    const castMembers = document.querySelectorAll('.cast');

    const grow = (entries, castObserver) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > .05) {
                checkWidth();
                castObserver.unobserve(entry.target);
            }
        })
    }

    const castObserver = new IntersectionObserver(grow, {
        root: null,
        threshold: .3,
    });

    castObserver.observe(sectionMobsters);

    //Function to check the screen width so a more user friendly design is used.
    const checkWidth = () => {
        if (window.innerWidth <= 512) {
            castMembers.forEach(member => {
                member.style.transform = 'skew(0) translateX(0)';
            })
        } else {
            castMembers.forEach(member => {
                member.style.transform = 'skew(-12deg) translateX(0)';
            })
        }
    }
    window.addEventListener('resize', checkWidth)


    //Add an observer for every section so that the correct link in the nav list will be highlighted.
    const links = document.querySelectorAll('.navigation__item');

    const options = {
        root: null,
        rootMargin: '-20%',
        threshold: [0, 1]
    };

    let setTop = 0;

    const active = (entries, sectionObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const active = entry.target.id;
                links.forEach(link => {
                    if (link.dataset.id === active) {
                        link.classList.add('navigation__item--active');
                    } else {
                        link.classList.remove('navigation__item--active');
                    }
                })
            }
        })
    }

    const sectionObserver = new IntersectionObserver(active, options);
    const sections = document.querySelectorAll('section');
    const top = document.getElementById('top');

    sectionObserver.observe(top);
    sections.forEach(section => {
        sectionObserver.observe(section);
    })


    //Function to control the parallax effect on the header section.
    const handleScroll = () => {
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
    }

    //Add observer to add and remove the parallax effect based on page location
    const header = document.querySelector('.header');

    const parallax = (entries, headerObserver) => {
        entries.forEach(entry => {
            console.log(entry)
            if (entry.isIntersecting) {
                window.addEventListener('scroll', handleScroll);
            } else {
                window.removeEventListener('scroll', handleScroll);
            }
        })
    }

    const headerObserver = new IntersectionObserver(parallax, {
        root: null,
        rootMargin: '0px 0px',
        threshold: [0, 1],
    })

    headerObserver.observe(header);
}