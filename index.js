const prevBtn = document.getElementById('courusel_prev');
const nextBtn = document.getElementById('courusel_next');
const courusel = document.getElementById('courusel');
const buttonPrev = document.getElementById('courusel_prev');
const buttonNext = document.getElementById('courusel_next');
const coruselImg = courusel.querySelectorAll('.courusel_item')[0];

let canDrag = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;
let coruselImgWidth = coruselImg.clientWidth;

buttonPrev.addEventListener('click', () => {
    courusel.scrollLeft -= coruselImgWidth
});

buttonNext.addEventListener('click', () => {
    courusel.scrollLeft += coruselImgWidth
});

const startDrag = (e) => {
    canDrag = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = courusel.scrollLeft;
    courusel.classList.add('dragging');
}

const autoSlide = () => {
    console.log('autoslde')
    positionDiff = Math.abs(positionDiff);
    let valDifference = coruselImgWidth - positionDiff
    if (courusel.scrollLeft > prevScrollLeft) {
        courusel.scrollLeft += positionDiff > coruselImgWidth / 6 ? valDifference : -positionDiff
    } else {
        courusel.scrollLeft -= positionDiff > coruselImgWidth / 6 ? valDifference : -positionDiff
    }
}

const spopDrag = () => {
    canDrag = false;
    courusel.classList.remove('dragging');
    console.log('dragging')
    autoSlide();
}

const dragging = (e) => {
    if (!canDrag) { return };
    e.preventDefault();
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    courusel.scrollLeft = prevScrollLeft - positionDiff;
}

courusel.addEventListener('mousedown', startDrag);
courusel.addEventListener('touchstart', startDrag);

courusel.addEventListener('mousemove', dragging);
courusel.addEventListener('touchmove', dragging);

courusel.addEventListener('mouseup', spopDrag);
courusel.addEventListener('touchend', spopDrag);