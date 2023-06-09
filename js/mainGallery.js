const photoGrid = document.querySelector('.photo-grid');
const loadMore = document.querySelector('.photo-grid__load');
const photoModal = document.querySelector('.photo-grid__modal');
const previous = document.querySelector('.photo-grid__prev');
const next = document.querySelector('.photo-grid__next');
const heading = document.querySelector('.main-gallery__heading');
const links = document.querySelectorAll('.navigation__item');

let startingWidth = window.innerWidth;
console.log(show, setName)

links.forEach(link => {
    console.log(link.getAttribute('data-id'))
    if (link.getAttribute('data-id') == 'gallery') {
        link.classList.add('navigation__item--active')
    }
})

if (show) {
    allShows.forEach(show => {
        if (show.name === setName) {
            heading.innerText = show.full_name;
        }
    })
} else {
    allPhotographers.forEach(photographer => {
        if (setName === 'all') {
            heading.innerText = 'All Photos';
        }
        if (photographer.name.toLowerCase() === setName) {
            heading.innerText = photographer.name;
        }
    })
}

let columns = 4;
const findColumns = () => {
    if (window.innerWidth < 950) {
        photoGrid.style.setProperty('--columns', '2');
        columns = 2;
    }
    // if (window.innerWidth < 512) {
    //     photoGrid.style.setProperty('--columns', '1');
    //     columns = 1;
    // }
}
findColumns();

window.addEventListener('resize', () => {
    if ((window.innerWidth < 950 && 950 < startingWidth) || (window.innerWidth > 950 && 950 > startingWidth)) {
        location.reload();
    }
})

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
results = shuffle(results);

// results.forEach((photo, index) => {
//     if (photo.is_long === 'true') {
//         results.push(results.splice(index, 1)[0]);
//     }
// })

let n = 1
while (n <= columns) {
    const newColumn = document.createElement('div');
    newColumn.classList.add('photo-grid__column', `photo-grid__column-${n}`);
    photoGrid.appendChild(newColumn);
    n++;
}

const resultsCopySmall = [...results];
const resultsCopyLarge = [...results];
let i = 1;
let skip, colHeight = 0;
function postSmallPhotos() {
    const findColumns = document.querySelectorAll('.photo-grid__column');
    resultsCopySmall.splice(0, 16).forEach(item => {
        const image = document.createElement('img');
        image.setAttribute('srcset', `${item.url_600} 600w, ${item.url_350} 350w`);
        image.setAttribute('sizes', '50vw');
        image.setAttribute('src', `${item.url_600}`);
        image.setAttribute('alt', `${item.alt_text}`);
        image.classList.add('photo-grid__image');
        if (i === skip) {
            i++;
            if (i > columns) i = 1;
            skip = -1;
        }
        document.querySelector(`.photo-grid__column-${i}`).appendChild(image);
        if (item.is_long === 'true') {
            skip = i;
        }
        if (i >= columns) i = 1;
        else i++;
        // findColumns.forEach(col => {
        //     if (col.getBoundingClientRect().height > colHeight + 10);
        // })
    })
    if (resultsCopySmall.length < 1) { loadMore.style.display = 'none' };
}
postSmallPhotos();


let j = 0;
const photoArray = [];
function postLargePhotos() {
    resultsCopyLarge.splice(0, 16).forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('photo-grid__wrapper');
        const container = document.createElement('div');
        container.classList.add('photo-grid__container');
        const image = document.createElement('img');
        image.setAttribute('srcset', `${item.url_600} 600w, ${item.url_2000} 2000w`)
        image.setAttribute('sizes', '90vw');
        image.setAttribute('src', `${item.url_600}`);
        image.setAttribute('alt', `${item.alt_text}`);
        image.classList.add('photo-grid__image--large');
        const credit = document.createElement('p');
        credit.classList.add('photo-grid__credit');
        credit.innerText = `Photo by ${item.name}`;
        container.appendChild(image);
        container.appendChild(credit);
        wrapper.appendChild(container);
        photoModal.appendChild(wrapper);
        photoArray.push(wrapper);
        j++;
    })
}
postLargePhotos();

let currentPhoto = 0;
const slide = (distance) => {
    if (currentPhoto === 0) {
        previous.style.display = 'none';
    } else {
        previous.style.display = 'block';
    }
    if (currentPhoto === results.length - 1) {
        next.style.display = 'none';
    } else {
        next.style.display = 'block';
    }
    photoArray.forEach((photo, index) => {
        photo.style.transform = `translateX(${(index - distance) * 100}%)`;
    })
}
slide(currentPhoto);

loadMore.addEventListener('click', () => {
    if (resultsCopySmall) {
        postSmallPhotos();
        postLargePhotos();
    }
})

photoGrid.addEventListener('click', e => {
    // if (window.innerWidth < 512) return;
    if (!e.target.classList.contains('photo-grid__image')) return;
    const compare = item => item.url_600 == e.target.getAttribute('src');
    currentPhoto = results.findIndex(compare);
    slide(currentPhoto);
    photoModal.style.display = 'block';
})

photoModal.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('photo-grid__wrapper') || target.classList.contains('photo-grid__close')) {
        photoModal.style.display = 'none';
    }
    if (target.classList.contains('photo-grid__next')) {
        currentPhoto++;
        if (currentPhoto > photoArray.length - 1 && resultsCopyLarge) {
            postSmallPhotos();
            postLargePhotos();
        }
        slide(currentPhoto);
    }
    if (target.classList.contains('photo-grid__prev')) {
        currentPhoto--;
        slide(currentPhoto);
    }
})
