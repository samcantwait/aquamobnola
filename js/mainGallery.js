const photoGrid = document.querySelector('.photo-grid');
const loadMore = document.querySelector('.photo-grid__load');
const photoModal = document.querySelector('.photo-grid__modal');
const previous = document.querySelector('.photo-grid__prev');
const next = document.querySelector('.photo-grid__next');
console.log(results)

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


const resultsCopySmall = [...results];
const resultsCopyLarge = [...results];
let i = 1;
let skip;
function postSmallPhotos() {
    resultsCopySmall.splice(0, 16).forEach(item => {
        const image = document.createElement('img');
        image.setAttribute('src', `${item.url_thumb}`);
        image.setAttribute('alt', `${item.alt_text}`);
        image.classList.add('photo-grid__image');
        if (skip === i) {
            if (i === 4) { i = 0 };
            i++;
            skip = -1
        }
        if (item.is_long === 'true') {
            skip = i;
        }
        document.querySelector(`.photo-grid__column-${i}`).appendChild(image);
        if (i >= 4) i = 1;
        else i++;
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
        image.setAttribute('src', `${item.url_large}`);
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
    if (!e.target.classList.contains('photo-grid__image')) return;
    const compare = item => item.url_thumb == e.target.getAttribute('src');
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
