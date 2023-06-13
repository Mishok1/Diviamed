const prevBtn = document.getElementById('carousel_prev');
const nextBtn = document.getElementById('carousel_next');
const carousel = document.getElementById('carousel');
const buttonPrev = document.getElementById('carousel_prev');
const buttonNext = document.getElementById('carousel_next');
const coruselImg = carousel.querySelectorAll('.carousel_item')[0];
const mobilePagination = document.getElementById('carousel_mobile_pagination');

let canDrag = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;
let coruselImgWidth = coruselImg.clientWidth;

buttonPrev.addEventListener('click', () => {
    carousel.scrollLeft -= coruselImgWidth
});

buttonNext.addEventListener('click', () => {
    carousel.scrollLeft += coruselImgWidth
});

const startDrag = (e) => {
    canDrag = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    carousel.classList.add('dragging');
}

const autoSlide = () => {
    const allLinks = document.querySelectorAll('.carousel_mobile_pagination_link');
    positionDiff = Math.abs(positionDiff);
    let valDifference = coruselImgWidth - positionDiff
    if (carousel.scrollLeft > prevScrollLeft) {
        carousel.scrollLeft += positionDiff > coruselImgWidth / 6 ? valDifference : -positionDiff
    } else {
        carousel.scrollLeft -= positionDiff > coruselImgWidth / 6 ? valDifference : -positionDiff
    }
    allLinks.forEach((link, i) => {
        if (Math.ceil(carousel.scrollLeft / coruselImgWidth) >= i + 1 || Math.ceil(carousel.scrollLeft / coruselImgWidth) <= i - 1) {
            link.classList.remove('carousel_mobile_pagination_active_link');
        } else {
            link.classList.add('carousel_mobile_pagination_active_link');
        }
    })
}

const stopDrag = () => {
    canDrag = false;
    carousel.classList.remove('dragging');
    autoSlide();
}

const dragging = (e) => {
    if (!canDrag) { return };
    e.preventDefault();
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', stopDrag);
carousel.addEventListener('touchend', stopDrag);

const getMobilePagination = () => {
    const allSlides = carousel.querySelectorAll('.carousel_item')
    allSlides.forEach((slide, index) => {
        mobilePagination.innerHTML += `
        <button
            class="carousel_mobile_pagination_link"
            onClick="navigateMobilePagination(${index})"
        ></button>
        `
    })
}

const navigateMobilePagination = (index) => {
    const allLinks = document.querySelectorAll('.carousel_mobile_pagination_link');
    carousel.scrollLeft = coruselImgWidth * index;
    allLinks.forEach((link, i) => {
        if (index === i) {
            link.classList.add('carousel_mobile_pagination_active_link');
        } else {
            link.classList.remove('carousel_mobile_pagination_active_link');
        }
    })
}

getMobilePagination()