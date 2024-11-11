export function initializeBlog() {
  // Выбираем все заголовки с классом "blog-slider__title"
  const blogSliderTitles = document.querySelectorAll(".blog-slider__title");

  // Заменяем пробелы перед "В" на неразрывные пробелы для корректного переноса
  blogSliderTitles.forEach((title) => {
    title.innerHTML = title.innerHTML.replace(/\sВ\s/g, " В&nbsp;");
  });

  // Текущий индекс слайда
  let currentIndex = 0;

  // Выборка элементов слайдера
  const blogSliderWrapper = document.querySelector(".blog-slider__wrapper");
  const slides = document.querySelectorAll(".blog-slider__item");
  const dotsContainer = document.querySelector(".blog-slider__dots");
  const pageNumbers = document.querySelector(".blog-slider__page-numbers");

  // Проверяем наличие слайдов
  if (slides.length === 0) return;

  // Параметры слайдера
  const totalSlides = slides.length;
  // Функция для определения количества отображаемых слайдов
  let slidesToShow = getSlidesToShow();
  // Порог для распознавания свайпа в пикселях
  const SWIPE_THRESHOLD = 20;

  // Рассчитываем ширину одного слайда с учетом margin-right
  const wrapperStyle = getComputedStyle(blogSliderWrapper);
  const gap = parseFloat(wrapperStyle.columnGap || wrapperStyle.gap) || 0;
  let slideWidth = slides[0].offsetWidth + gap;

  // Функция для определения количества отображаемых слайдов
  function getSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 420) {
      return 1;
    } else if (width <= 880) {
      return 2;
    } else {
      return 3;
    }
  }

  // Функция для создания и обновления точек пагинации
  function updateDots() {
    dotsContainer.innerHTML = "";

    const totalPages = Math.ceil(totalSlides / slidesToShow);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === Math.floor(currentIndex / slidesToShow)) {
        dot.classList.add("active");
      }
      dotsContainer.appendChild(dot);
    }
  }

  // Функция для обновления пагинации
  function updatePagination() {
    updateDots();

    const totalPages = Math.ceil(totalSlides / slidesToShow);
    const currentPage = String(Math.floor(currentIndex / slidesToShow) + 1).padStart(2, "0");
    const totalPage = String(totalPages).padStart(2, "0");
    pageNumbers.innerHTML = `<span>${currentPage}</span><div class="line"></div><span>${totalPage}</span>`;
  }

  // Функция для перехода к определенному слайду
  function goToSlide(index) {
    // Ограничение индекса в допустимых пределах
    currentIndex = Math.max(0, Math.min(index, totalSlides - slidesToShow));

    // Перемещаем слайдер с помощью transform
    blogSliderWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Обновляем пагинацию
    updatePagination();
  }

  // Переменные для отслеживания жестов
  let startX = 0;
  let isDragging = false;

  // Обработчик начала жеста (тач или мышь)
  function handleStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
  }

  // Обработчик движения (тач или мышь)
  function handleMove(e) {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = startX - currentX;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      isDragging = false; // Остановка дальнейшего перемещения
      if (deltaX > 0 && currentIndex < totalSlides - slidesToShow) {
        goToSlide(currentIndex + slidesToShow); // Свайп влево
      } else if (deltaX < 0 && currentIndex > 0) {
        goToSlide(currentIndex - slidesToShow); // Свайп вправо
      }
    }
  }

  // Обработчик завершения жеста
  function handleEnd() {
    isDragging = false;
  }

  // Добавляем обработчики событий для тач-устройств
  blogSliderWrapper.addEventListener("touchstart", handleStart, { passive: true });
  blogSliderWrapper.addEventListener("touchmove", handleMove, { passive: true });
  blogSliderWrapper.addEventListener("touchend", handleEnd);
  blogSliderWrapper.addEventListener("touchcancel", handleEnd);

  // Добавляем обработчики событий для мыши
  blogSliderWrapper.addEventListener("mousedown", handleStart);
  blogSliderWrapper.addEventListener("mousemove", handleMove);
  blogSliderWrapper.addEventListener("mouseup", handleEnd);
  blogSliderWrapper.addEventListener("mouseleave", handleEnd);

  // Обработка кликов по точкам пагинации
  dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dot")) {
      const index = Array.from(dotsContainer.children).indexOf(e.target);
      goToSlide(index * slidesToShow);
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener("resize", () => {
    const newSlidesToShow = getSlidesToShow();
    if (newSlidesToShow !== slidesToShow) {
      slidesToShow = newSlidesToShow;
    }

    // Обновляем ширину слайда и значение gap
    const wrapperStyle = getComputedStyle(blogSliderWrapper);
    const gap = parseFloat(wrapperStyle.columnGap || wrapperStyle.gap) || 0;
    slideWidth = slides[0].offsetWidth + gap;

    // Пересчитываем текущий индекс, чтобы не выходить за пределы
    currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - slidesToShow));

    // Обновляем слайдер
    goToSlide(currentIndex);
  });

  // Начальная инициализация пагинации и слайдера
  updatePagination();
  goToSlide(currentIndex);
}
