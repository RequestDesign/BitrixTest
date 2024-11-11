export function initializeFilters() {
  const canvas = document.getElementById("price-slider"); // Получаем элемент canvas для отрисовки ползунков
  const ctx = canvas.getContext("2d"); // Получаем контекст для рисования на canvas

  // Диапазон цен
  const minPrice = 67000; // Минимальная цена
  const maxPrice = 521000; // Максимальная цена
  let minRangeValue = minPrice; // Текущее минимальное значение ползунка
  let maxRangeValue = maxPrice; // Текущее максимальное значение ползунка

  // Положение ползунков
  let padding = 20; // Отступ от краев слайдера
  let minSliderPos = padding; // Позиция минимального ползунка
  let maxSliderPos = canvas.width - padding; // Позиция максимального ползунка

  // Радиус ползунков
  const knobRadius = 11.5; // Внутренний радиус ползунка
  const outerKnobRadius = 8; // Внешний радиус ползунка

  // Параметры тени (симуляция эффекта box-shadow)
  const shadowOffsetX = 2; // Смещение тени по оси X
  const shadowOffsetY = 4; // Смещение тени по оси Y
  const shadowBlur = 13; // Размытие тени
  const shadowColor = "#AE97E8"; // Цвет тени (лавандовый)

  // Флаги для отслеживания перемещения ползунков
  let draggingMin = false; // Флаг для перемещения минимального ползунка
  let draggingMax = false; // Флаг для перемещения максимального ползунка

  // Функция для отрисовки слайдера
  function drawSlider() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas перед перерисовкой

    // Настройка скругления концов линий
    ctx.lineCap = "round";

    // Отрисовка полной линии диапазона (белая часть справа)
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height / 2);
    ctx.lineTo(canvas.width - padding, canvas.height / 2);
    ctx.stroke();

    // Линия от начала до левого ползунка (зеленая)
    ctx.strokeStyle = "#D9FF5A";
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height / 2);
    ctx.lineTo(minSliderPos, canvas.height / 2);
    ctx.stroke();

    // Линия между ползунками (зеленая)
    ctx.beginPath();
    ctx.moveTo(minSliderPos, canvas.height / 2);
    ctx.lineTo(maxSliderPos, canvas.height / 2);
    ctx.stroke();

    // Отрисовка левого ползунка с тенью
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;

    ctx.beginPath();
    ctx.arc(minSliderPos, canvas.height / 2, knobRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#D9FF5A";
    ctx.fill();

    // Сброс настроек тени и отрисовка внешней границы ползунка
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(minSliderPos, canvas.height / 2, outerKnobRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#AE97E8";
    ctx.lineWidth = 5;
    ctx.stroke();

    // Аналогично отрисовываем правый ползунок с тенью
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;

    ctx.beginPath();
    ctx.arc(maxSliderPos, canvas.height / 2, knobRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#D9FF5A";
    ctx.fill();

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(maxSliderPos, canvas.height / 2, outerKnobRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#AE97E8";
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  // Функция обновления значений цен
  function updatePriceValues() {
    const priceMin = document.getElementById("price-min"); // Элемент для минимальной цены
    const priceMax = document.getElementById("price-max"); // Элемент для максимальной цены

    // Элементы для отображения значений под ползунками
    const sliderMinValue = document.getElementById("filter-slider-min-value");
    const sliderMaxValue = document.getElementById("filter-slider-max-value");

    // Рассчитываем значения цен в зависимости от положения ползунков
    const minPriceValue = Math.round(
      ((minSliderPos - padding) / (canvas.width - padding * 2)) * (maxPrice - minPrice) + minPrice
    );
    const maxPriceValue = Math.round(
      ((maxSliderPos - padding) / (canvas.width - padding * 2)) * (maxPrice - minPrice) + minPrice
    );

    // Обновляем текстовые значения в полях
    priceMin.value = `от ${minPriceValue.toLocaleString()}`;
    priceMax.value = `до ${maxPriceValue.toLocaleString()}`;

    // Обновляем значения и их положение на слайдере
    sliderMinValue.textContent = `${minPriceValue.toLocaleString()}`;
    sliderMaxValue.textContent = `${maxPriceValue.toLocaleString()}`;
    sliderMinValue.style.left = `${minSliderPos}px`;
    sliderMaxValue.style.left = `${maxSliderPos}px`;

    minRangeValue = minPriceValue;
    maxRangeValue = maxPriceValue;
  }

  // Функция очистки нечисловых символов из input полей
  function sanitizeInput(input) {
    return input.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
  }

  // Обработчики событий для ввода в поля минимальной и максимальной цены
  document.getElementById("price-min").addEventListener("input", function () {
    this.value = `от ${sanitizeInput(this.value)}`;
  });

  document.getElementById("price-max").addEventListener("input", function () {
    this.value = `до ${sanitizeInput(this.value)}`;
  });

  // Обработчики событий для изменения значения минимальной цены
  document.getElementById("price-min").addEventListener("change", function () {
    const value = parseInt(sanitizeInput(this.value));
    minSliderPos = Math.max(
      padding,
      ((value - minPrice) / (maxPrice - minPrice)) * (canvas.width - padding * 2) + padding
    );
    drawSlider();
  });

  // Обработчики событий для изменения значения максимальной цены
  document.getElementById("price-max").addEventListener("change", function () {
    const value = parseInt(sanitizeInput(this.value));
    maxSliderPos = Math.min(
      canvas.width - padding,
      ((value - minPrice) / (maxPrice - minPrice)) * (canvas.width - padding * 2) + padding
    );
    drawSlider();
  });

  // Обработчики событий для перемещения ползунков мышью
  canvas.addEventListener("mousedown", function (e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const distMin = Math.sqrt((mouseX - minSliderPos) ** 2 + (mouseY - canvas.height / 2) ** 2);
    const distMax = Math.sqrt((mouseX - maxSliderPos) ** 2 + (mouseY - canvas.height / 2) ** 2);

    if (distMin < knobRadius) {
      draggingMin = true;
    } else if (distMax < knobRadius) {
      draggingMax = true;
    }
  });

  canvas.addEventListener("mousemove", function (e) {
    if (draggingMin || draggingMax) {
      const mouseX = e.offsetX;

      if (draggingMin) {
        minSliderPos = Math.max(padding, Math.min(mouseX, maxSliderPos - knobRadius));
      } else if (draggingMax) {
        maxSliderPos = Math.min(
          canvas.width - padding,
          Math.max(mouseX, minSliderPos + knobRadius)
        );
      }

      drawSlider();
      updatePriceValues();
    }
  });

  canvas.addEventListener("mouseup", function () {
    draggingMin = false;
    draggingMax = false;
  });

  // Первоначальная отрисовка ползунков и обновление значений
  drawSlider();
  updatePriceValues();

  // Обработчик для кнопки фильтров
  document.getElementById("filter-button").addEventListener("click", function () {
    const filters = document.querySelector(".filters"); // Контейнер фильтров
    const icon = document.querySelector(".filter-button .icon"); // Иконка кнопки фильтра

    filters.classList.toggle("filters--active"); // Переключаем активное состояние фильтров
    icon.classList.toggle("icon--active"); // Переключаем состояние иконки
  });
}
