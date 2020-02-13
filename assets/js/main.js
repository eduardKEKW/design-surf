const pageBtns = document.querySelectorAll('#page-btn');
const sliderBtns = document.querySelectorAll('.slider__btn');
const sliderImages = document.querySelector(".intro__images-container");
const sliderShop = document.querySelector('.slider__content-slider');
const showAllBtn = document.querySelector('#show-all');
const content = document.querySelector(".slider__content");

let i = 0;
const onImageSlide = ( { target }) => {
    const side = target.getAttribute("name");
    const len = sliderImages.children.length-1;

    if(side == 'right') {
        if(i === len) return;
        i++;
        sliderImages.style.transform = `translateX(${i * - 100}%)`;
    } else {
        if(i === 0) return;
        i--;
        sliderImages.style.transform = `translateX(${i * - 100}%)`;
    }

    document.querySelector("#image-number").innerHTML = i + 1;
}

let j = 2;
const onSliderMove = ({ target }) => {
  const side = target.getAttribute("name");
  const size = sliderShop.children.length;
  const node = sliderShop.children[0];
  const width = node.offsetWidth;
    console.log(side);
  var matrix = new WebKitCSSMatrix(
    window.getComputedStyle(sliderShop).webkitTransform
  );
  let total = +matrix.m41;

  total += side === "left" ? width : -width;

  if ((j === 1 && side == "left") || (j === size && side == "right")) return;

  j += side === "left" ? -1 : 1;

  sliderShop.style.transform = `translateX(${total}px)`;
};

const showAll = ({ target }) => {
    const action = target.getAttribute('name');

    if(action == 'show') {
        sliderShop.style.transform = `translateX(${0}px)`;
        content.style.overflow = "visible";
        sliderShop.style.flexWrap = "wrap";
        sliderBtns.forEach(btn => (btn.style.display = "none"));
        showAllBtn.innerHTML = 'HIDE';
        showAllBtn.setAttribute("name", "hide");
    } else {
        content.style.overflow = "hidden";
        sliderShop.style.flexWrap = "nowrap";
        sliderBtns.forEach(btn => (btn.style.display = "flex"));
        showAllBtn.innerHTML = "SHOW ALL";
        showAllBtn.setAttribute("name", "show");
    }
}

pageBtns.forEach(btn => btn.addEventListener('click', onImageSlide));
sliderBtns.forEach(btn => btn.addEventListener('click', onSliderMove));
showAllBtn.addEventListener('click', showAll);