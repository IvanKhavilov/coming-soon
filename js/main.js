const btnNext = document.querySelector(".button__next");
const btnPrev = document.querySelector(".button__prev");
const slides = document.querySelectorAll(".slider__item");
const numberActiveSlide = document.querySelectorAll(".slides__number");
const nameActiveSlide = document.querySelectorAll(".slider__name");

let index = 0;

const activeSlide = n => {
  for (slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const activeNumber = n => {
  for (number of numberActiveSlide) {
    number.classList.remove("active");
  }
  numberActiveSlide[n].classList.add("active");
};

const activeName = n => {
  for (nameSlider of nameActiveSlide) {
    nameSlider.classList.remove("active");
  }
  nameActiveSlide[n].classList.add("active");
};

const prepareCurrentSlide = ind => {
  activeSlide(index);
  activeNumber(index);
  activeName(index);
};

const nextSlide = () => {
  if (index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide();
  } else {
    index++;
    prepareCurrentSlide();
  }
};

const prevSlide = () => {
  if (index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide();
  } else {
    index--;
    prepareCurrentSlide();
  }
};

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
  animationTime = 600,
  framesCount = 150;

function activeDot() {
  anchors.forEach(function (el) {
    el.classList.remove("active");
  });
  this.classList.add("active");
}

anchors.forEach(function (el) {
  el.addEventListener("click", activeDot);
});

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener("click", function (e) {
    // убираем стандартное поведение
    e.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY =
      document.querySelector(item.getAttribute("href")).getBoundingClientRect()
        .top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента и дно страницы не достигнуто
      if (
        scrollBy > window.pageYOffset - coordY &&
        window.innerHeight + window.pageYOffset < document.body.offsetHeight
      ) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});

//Записываем, сколько проскроллено по вертикали
let scrollpos = window.scrollY;

const about = document.querySelector(".about");

//Сколько пикселей нужно проскролить, чтобы добавить класс
const scrollChange = 400;

//Функция, которая будет добавлять класс
const addClassOnScroll = () => {
  about.classList.add("active");
};

//Отслеживаем скролл
window.addEventListener("scroll", function () {
  scrollpos = window.scrollY;

  //Если прокрутили больше, чем мы указали в переменной scrollChange, то выполняется функция добавления класса
  if (scrollpos >= scrollChange) {
    addClassOnScroll();
  }
});
