
const loadMore = document.querySelector('.photo-grid__load');
let i = 1;
function postPhotos() {
    results.splice(0, 16).forEach(item => {
        const image = document.createElement('img');
        image.setAttribute('src', `${item.url}`);
        image.classList.add('photo-grid__image');
        document.querySelector(`.photo-grid__column-${i}`).appendChild(image);
        if (i === 4) i = 1;
        else i++;
    })
    console.log(results.length < 1);
    if (results.length < 1) { loadMore.style.display = 'none' };
}
postPhotos();


loadMore.addEventListener('click', () => {
    if (results) postPhotos();
})
