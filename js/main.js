const btnNext = document.querySelector(".button__next");
const btnPrev = document.querySelector(".button__prev");
const slides = document.querySelectorAll(".slider__item");
const numberActiveSlide = document.querySelectorAll(".slides__number");
const nameActiveSlide = document.querySelectorAll(".slider__name");

let index = 0;

const activeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove("active");
  }
  slides[n].classList.add("active");
};

const activeNumber = (n) => {
  for (number of numberActiveSlide) {
    number.classList.remove("active");
  }
  numberActiveSlide[n].classList.add("active");
};

const activeName = (n) => {
  for (nameSlider of nameActiveSlide) {
    nameSlider.classList.remove("active");
  }
  nameActiveSlide[n].classList.add("active");
};

const prepareCurrentSlide = (ind) => {
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

function activateNavigation() {
  const sections = document.querySelectorAll(".section");
  const navContainer = document.createElement("nav");
  const navItems = Array.from(sections).map((section) => {
    return `
      <div class="nav__item" data-for-section="${section.id}">
        <a href="#${section.id}" class="nav__item-link"></a>
      </div>`;
  });

  navContainer.classList.add("nav");
  navContainer.innerHTML = navItems.join("");

  const observer = new IntersectionObserver(
    (entries) => {
      document.querySelectorAll(".nav__item-link").forEach((navLink) => {
        // navLink.classList.remove("active");
      });
      const activeDot = entries.reduce((acc, curr) =>
        acc.intersectionRatio > curr.intersectionRatio ? acc : curr
      );
      if (activeDot.intersectionRatio < 0.5) {
        return;
      }
      document
        .querySelectorAll(".nav__item-link")
        .forEach((n) => n.classList.remove("active"));
      document
        .querySelector(
          `.nav__item[data-for-section="${activeDot.target.id}"]>.nav__item-link`
        )
        .classList.add("active");
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  sections.forEach((section) => observer.observe(section));

  document.body.appendChild(navContainer);
}
activateNavigation();
