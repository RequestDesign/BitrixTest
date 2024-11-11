document.addEventListener("DOMContentLoaded", function () {
  // Функция для получения элементов слайдера по индексу
  function getSliderElements(index) {
    return {
      slider: document.querySelector(`.slider__item:nth-child(${index})`),
      image: document.querySelector(`.slider__item:nth-child(${index}) .slider__image`),
      badge: document.querySelector(`.slider__item:nth-child(${index}) .slider__badge`),
      title: document.querySelector(`.slider__item:nth-child(${index}) .slider__title`),
      details: document.querySelector(`.slider__item:nth-child(${index}) .slider__details`),
      subtitle: document.querySelector(`.slider__item:nth-child(${index}) .slider__subtitle`),
      description: document.querySelector(`.slider__item:nth-child(${index}) .slider__description`),
      descriptionSecondary: document.querySelector(
        `.slider__item:nth-child(${index}) .slider__description--secondary`
      ),
      price: document.querySelector(`.slider__item:nth-child(${index}) .slider__price`),
      button: document.querySelector(`.slider__item:nth-child(${index}) .slider__button`),
      label: document.querySelector(`.slider__item:nth-child(${index}) .slider__label`),
    };
  }

  // Создаем массив слайдов, используя getSliderElements для каждого слайда
  const sliders = [1, 2, 3].map((index) => getSliderElements(index));

  // Размеры изображений для каждого слайда в различных состояниях
  const imageSizes = {
    1: { other: "8.28vw", default: "10.36vw", hover: "17.76vw" },
    2: { other: "9.53vw", default: "11.98vw", hover: "20.52vw" },
    3: { other: "8.23vw", default: "10.31vw", hover: "18.44vw" },
  };

  // Функция для обработки события "mouseenter" (наведение мыши на слайд)
  function handleMouseEnter(
    sliderElements,
    imageKey,
    otherTitles,
    otherDetails,
    otherLabel,
    otherImages
  ) {
    const {
      slider,
      image,
      badge,
      title,
      details,
      subtitle,
      description,
      descriptionSecondary,
      price,
      button,
    } = sliderElements;

    const imageSize = imageSizes[imageKey].hover; // Размер изображения при наведении

    // Если текущий активный слайд не тот, на который навели, сменить активный слайд
    if (activeSlide !== sliderElements) {
      activeSlide.slider.classList.remove("slider__item--expanded");
      activeSlide = sliderElements;
    }

    // Увеличение текущего слайда
    slider.style.flexGrow = "3";
    slider.style.width = "60vw";
    slider.style.transition = "flex-grow 1.5s ease, width 1.5s ease, background-color 1s ease";
    slider.classList.add("slider__item--expanded");

    // Изменение изображения при наведении
    image.style.width = imageSize;
    image.style.transform = `translateY(-50%) rotate(0deg)`;
    image.style.transition = "width 1s ease, transform 1s ease";

    // Показ и стилизация бейджа
    badge.style.opacity = "1";
    badge.style.visibility = "visible";
    badge.style.fontSize = "18px";
    badge.style.transition = "opacity 1s ease, font-size 1s ease";

    // Стилизация заголовка
    title.style.fontSize = "clamp(4.5rem, 11vw, 28rem)";
    title.style.transition = "font-size 1.5s ease, opacity 1s ease";

    // Стилизация блока с деталями
    details.style.left = "0";
    details.style.transform = "translateX(0)";
    details.style.opacity = "1";
    details.style.transition = "left 1.5s ease, transform 1.5s ease, opacity 0.5s ease";

    // Стилизация подзаголовка
    subtitle.style.left = "0";
    subtitle.style.transform = "translateX(0)";
    subtitle.style.fontSize = "28px";
    subtitle.style.transition = "left 1.5s ease, transform 1.5s ease , font-size 1.5s ease";

    // Скрытие основного описания
    description.style.opacity = "0";
    description.style.visibility = "hidden";

    // Показ вторичного описания
    descriptionSecondary.style.opacity = "1";
    descriptionSecondary.style.visibility = "visible";

    // Стилизация цены
    price.style.left = "0";
    price.style.transform = "translateX(0)";
    price.style.fontSize = "40px";
    price.style.color = "var(--color-lime)";
    price.style.transition =
      "color 1.5s ease, font-size 1.5s ease, left 1.5s ease, transform 1.5s ease";

    // Стилизация кнопки
    button.style.bottom = "11.4%";
    button.style.right = "16%";
    button.style.opacity = "1";
    button.style.zIndex = "2";
    button.style.transition = "right 1s ease, bottom 1.5s ease, opacity 1s ease";

    // Скрытие других заголовков
    otherTitles.forEach((otherTitle) => {
      otherTitle.style.visibility = "hidden";
      otherTitle.style.opacity = "0";
      otherTitle.style.fontSize = "4.5rem";
      otherTitle.style.transition = "opacity 1s ease , visibility 1s ease, font-size 1s ease";
    });

    // Скрытие других деталей
    otherDetails.forEach((otherDetail) => {
      otherDetail.style.visibility = "hidden";
      otherDetail.style.opacity = "0";
      otherDetail.style.left = "50%";
      otherDetail.style.transform = "translateX(-50%)";
      otherDetail.style.transition =
        "opacity 0.5s ease , visibility 0.5s ease, left 1s ease, transform 1s ease";
    });

    // Показ других лейблов
    otherImages.forEach((otherImage, i) => {
      const otherImageSize = imageSizes[i === 0 ? 2 : i + 2].other;
      otherImage.style.width = otherImageSize;
      otherImage.style.transform = "translateY(-47%) rotate(7deg)";
      otherImage.style.transition = "width 1.5s ease, transform 1.5s ease";
    });

    // Показ других лейблов
    otherLabel.forEach((otherLabel) => {
      otherLabel.style.opacity = "1";
      otherLabel.style.visibility = "visible";
      otherLabel.style.transition = "opacity 1s ease, visibility 1s ease";
    });
  }

  // Функция для обработки события "mouseleave" (уход мыши со слайда)
  function handleMouseLeave(
    sliderElements,
    imageKey,
    otherTitles,
    otherDetails,
    otherLabel,
    otherImages
  ) {
    const {
      slider,
      image,
      badge,
      title,
      details,
      subtitle,
      description,
      descriptionSecondary,
      price,
      label,
      button,
    } = sliderElements;
    const imageSize = imageSizes[imageKey].default; // Размер изображения по умолчанию

    // Уменьшение слайда до первоначального состояния
    slider.style.flexGrow = "1";
    slider.style.width = "17.5vw";
    slider.classList.remove("slider__item--expanded");

    // Восстановление состояния изображения
    image.style.width = imageSize;
    image.style.transform = "translateY(-50%) rotate(7deg)";
    image.style.transition = "width 1s ease, transform 1s ease";

    // Восстановление заголовка
    title.style.fontSize = "4.5rem";
    title.style.visibility = "visible";
    title.style.opacity = "1";
    title.style.transition = "opacity 1s ease, font-size 1s ease, visibility 1s ease";

    // Скрытие бейджа
    badge.style.opacity = "0";
    badge.style.fontSize = "0px";
    badge.style.transition = "opacity 1s ease, font-size 1s ease";

    // Восстановление деталей
    details.style.left = "50%";
    details.style.transform = "translateX(-50%)";
    details.style.visibility = "visible";

    // Восстановление подзаголовка
    subtitle.style.left = "50%";
    subtitle.style.transform = "translateX(-50%)";
    subtitle.style.fontSize = "20px";
    subtitle.style.transition = "left 1.5s ease, transform 1.5s ease , font-size 1.5s ease";

    // Восстановление описания
    description.style.opacity = "1";
    description.style.visibility = "visible";
    descriptionSecondary.style.opacity = "0";
    descriptionSecondary.style.visibility = "hidden";

    // Восстановление цены
    price.style.left = "50%";
    price.style.transform = "translateX(-50%)";
    price.style.fontSize = "28px";
    price.style.color = "var(--color-white)";
    price.style.transition =
      "color 1.5s ease, font-size 1.5s ease, left 1.5s ease, transform 1.5s ease";

    // Стилизация label
    label.style.opacity = "0";
    label.style.visibility = "hidden";
    label.style.fontSize = "0px";
    label.style.transition = "opacity 0.5s ease, visibility 0.5s ease";

    // Скрытие кнопки
    button.style.right = "40%";
    button.style.bottom = "-50%";
    button.style.opacity = "0";
    button.style.transition = "right 1s ease, bottom 1.5s ease, opacity 1s ease";

    // Показ других заголовков
    otherTitles.forEach((otherTitle) => {
      otherTitle.style.visibility = "visible";
      otherTitle.style.opacity = "1";
      otherTitle.style.transition = "opacity 1.5s ease";
    });

    // Показ других деталей
    otherDetails.forEach((otherDetail) => {
      otherDetail.style.visibility = "visible";
      otherDetail.style.opacity = "1";
      otherDetail.style.transition = "opacity 1.5s ease , visibility 1.5s ease";
    });

    // Восстановление других изображений
    otherImages.forEach((otherImage, i) => {
      const otherImageSize = imageSizes[i === 0 ? 2 : i + 2].default;
      otherImage.style.width = otherImageSize;
      otherImage.style.transition = "width 1.5s ease";
    });

    otherLabel.forEach((otherLabel) => {
      otherLabel.style.opacity = "0";
      otherLabel.style.visibility = "hidden";
      otherLabel.style.transition = "opacity 0.5s ease, visibility 0.5s ease";
    });
  }

  let activeIndex = 0;
  let activeSlide = sliders[activeIndex];

  function removeExpandedClass() {
    sliders.forEach((slider) => {
      slider.slider.classList.remove("slider__item--expanded");
    });
  }
  const swipe = function (el, settings) {
    const options = Object.assign(
      {},
      {
        minDist: 60, // минимальная дистанция, чтобы жест считался свайпом (px)
        maxTime: 700, // максимальное время для свайпа (ms)
        minTime: 50, // минимальное время для свайпа (ms)
      },
      settings
    );

    let dir,
      dist,
      startX = 0,
      startY = 0,
      startTime = 0,
      isMouse = false,
      isMouseDown = false;

    const getSupportedEvents = function () {
      const support = {
        pointer: !!("PointerEvent" in window),
        touch: !!("ontouchstart" in window || navigator.maxTouchPoints > 0),
      };
      return support.pointer
        ? {
            type: "pointer",
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup",
          }
        : support.touch
        ? {
            type: "touch",
            start: "touchstart",
            move: "touchmove",
            end: "touchend",
          }
        : {
            type: "mouse",
            start: "mousedown",
            move: "mousemove",
            end: "mouseup",
          };
    };

    const events = getSupportedEvents();

    const eventsUnify = (e) => (e.changedTouches ? e.changedTouches[0] : e);

    const checkStart = (e) => {
      const event = eventsUnify(e);
      dir = "none";
      dist = 0;
      startX = event.pageX;
      startY = event.pageY;
      startTime = new Date().getTime();
      if (isMouse) isMouseDown = true;
    };

    const checkMove = (e) => {
      if (isMouse && !isMouseDown) return;
      const event = eventsUnify(e);
      const distX = event.pageX - startX;
      const distY = event.pageY - startY;
      dir =
        Math.abs(distX) > Math.abs(distY)
          ? distX < 0
            ? "left"
            : "right"
          : distY < 0
          ? "up"
          : "down";
    };

    const checkEnd = (e) => {
      if (isMouse && !isMouseDown) {
        isMouseDown = false;
        return;
      }
      const endTime = new Date().getTime();
      const time = endTime - startTime;
      if (time >= options.minTime && time <= options.maxTime) {
        dist = Math.abs(
          dir === "left" || dir === "right"
            ? startX - eventsUnify(e).pageX
            : startY - eventsUnify(e).pageY
        );
        if (dist >= options.minDist) {
          const swipeEvent = new CustomEvent("swipe", {
            bubbles: true,
            cancelable: true,
            detail: { dir, dist, time },
          });
          el.dispatchEvent(swipeEvent);
        }
      }
    };

    el.addEventListener(events.start, checkStart);
    el.addEventListener(events.move, checkMove);
    el.addEventListener(events.end, checkEnd);
  };

  function setActiveSlide(currentIndex) {
    const previousIndex = sliders.indexOf(activeSlide);
    const currentSliderElements = sliders[currentIndex];
    const previousSliderElements = activeSlide;

    // Проверка, нужно ли применять класс `slider__item--expanded`
    if (!isMobile()) {
      console.log(`Переключение слайда: с ${previousIndex + 1} на ${currentIndex + 1}`);

      // Подготовка параметров для предыдущего слайда
      const previousOtherTitles = sliders
        .filter((_, i) => i !== previousIndex)
        .map((slider) => slider.title);
      const previousOtherDetails = sliders
        .filter((_, i) => i !== previousIndex)
        .map((slider) => slider.details);
      const previousOtherLabel = sliders
        .filter((_, i) => i !== previousIndex)
        .map((slider) => slider.label);
      const previousOtherImages = sliders
        .filter((_, i) => i !== previousIndex)
        .map((slider) => slider.image);

      // Сброс предыдущего слайда
      handleMouseLeave(
        previousSliderElements,
        previousIndex + 1,
        previousOtherTitles,
        previousOtherDetails,
        previousOtherLabel,
        previousOtherImages
      );

      // Подготовка параметров для текущего слайда
      const currentOtherTitles = sliders
        .filter((_, i) => i !== currentIndex)
        .map((slider) => slider.title);
      const currentOtherDetails = sliders
        .filter((_, i) => i !== currentIndex)
        .map((slider) => slider.details);
      const currentOtherLabel = sliders
        .filter((_, i) => i !== currentIndex)
        .map((slider) => slider.label);
      const currentOtherImages = sliders
        .filter((_, i) => i !== currentIndex)
        .map((slider) => slider.image);

      // Активация текущего слайда
      handleMouseEnter(
        currentSliderElements,
        currentIndex + 1,
        currentOtherTitles,
        currentOtherDetails,
        currentOtherLabel,
        currentOtherImages
      );

      activeSlide = currentSliderElements;
      activeIndex = currentIndex;
    } else {
      // Убираем все расширения слайдов на мобильных разрешениях
      removeExpandedClass();
      console.log("Мобильное разрешение. Расширение слайдов отключено.");

      const sliderContainer = document.querySelector(".slider");
      const slideWidth = window.innerWidth;

      sliderContainer.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth",
      });
    }

    activeIndex = currentIndex;
    activeSlide = currentSliderElements;
  }

  // Функции переключения слайдов
  function nextSlide() {
    console.log("Переключение на следующий слайд");
    const newIndex = (activeIndex + 1) % sliders.length;
    setActiveSlide(newIndex);
  }

  function prevSlide() {
    console.log("Переключение на предыдущий слайд");
    const newIndex = (activeIndex - 1 + sliders.length) % sliders.length;
    setActiveSlide(newIndex);
  }

  // Функция для инициализации свайпов  function initializeSwipes() {
  function initializeSwipes() {
    const slider = document.querySelector(".slider");

    // Используем функцию свайпа
    swipe(slider, { minDist: 50 });

    slider.addEventListener("swipe", function (e) {
      console.log(`Свайп ${e.detail.dir} обнаружен!`);
      if (e.detail.dir === "left") {
        nextSlide();
      } else if (e.detail.dir === "right") {
        prevSlide();
      }
    });
  }

  // Проверка мобильного разрешения
  function isMobile() {
    return window.innerWidth <= 1280;
  }

  // Инициализация свайпов только на мобильных устройствах
  if (isMobile()) {
    initializeSwipes();
    removeExpandedClass();
  } else {
    // Добавляем события только для десктопа
    sliders.forEach((sliderElements, index) => {
      const otherTitles = sliders.filter((_, i) => i !== index).map((slider) => slider.title);
      const otherDetails = sliders.filter((_, i) => i !== index).map((slider) => slider.details);
      const otherLabel = sliders.filter((_, i) => i !== index).map((slider) => slider.label);
      const otherImages = sliders.filter((_, i) => i !== index).map((slider) => slider.image);

      // Наведение на слайд
      sliderElements.slider.addEventListener("mouseenter", () =>
        handleMouseEnter(
          sliderElements,
          index + 1,
          otherTitles,
          otherDetails,
          otherLabel,
          otherImages
        )
      );

      // Уход с слайда
      sliderElements.slider.addEventListener("mouseleave", () =>
        handleMouseLeave(
          sliderElements,
          index + 1,
          otherTitles,
          otherDetails,
          otherLabel,
          otherImages
        )
      );

      // Клик по слайду
      // sliderElements.slider.addEventListener("click", () =>
      //   handleMouseEnter(
      //     sliderElements,
      //     index + 1,
      //     otherTitles,
      //     otherDetails,
      //     otherLabel,
      //     otherImages
      //   )
      // );

      // // Двойной клик по слайду
      // sliderElements.slider.addEventListener("dblclick", () =>
      //   handleMouseLeave(
      //     sliderElements,
      //     index + 1,
      //     otherTitles,
      //     otherDetails,
      //     otherLabel,
      //     otherImages
      //   )
      // );
    });
  }
});
