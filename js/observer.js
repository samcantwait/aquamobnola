export const observer = () => {
    const sectionShow = document.querySelector('.section-show');
    const photos = document.querySelectorAll('.show__photos');

    const sectionMobsters = document.querySelector('.section-mobsters');
    const castMembers = document.querySelectorAll('.cast');

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
        threshold: .1,
    });

    showObserver.observe(sectionShow);

    const grow = (entries, castObserver) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > .05) {
                castMembers.forEach(member => {
                    member.style.transform = 'skew(-12deg) translateX(0)';
                })
                castObserver.unobserve(entry.target);
            }
        })
    }

    const castObserver = new IntersectionObserver(grow, {
        root: null,
        threshold: .3,
    });

    castObserver.observe(sectionMobsters);

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
    checkWidth();
    window.addEventListener('resize', checkWidth)

    const links = document.querySelectorAll('.navigation__item');

    const options = {
        root: null,
        threshold: .1,
    };

    const active = (entries, sectionObserver) => {
        entries.forEach(entry => {
            // console.log(entry.target.id);
            // console.log(entry);
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
}