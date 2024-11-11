export function initializeCategories() {
  const categoryNames = document.querySelectorAll(".categories__name");
  const categoriesContents = document.querySelectorAll(".categories__content");
  const categoriesButtons = document.querySelectorAll(".categories__button");
  const categoriesList = document.querySelector(".categories__list");

  let startX = 0;
  let scrollLeft = 0;
  let isDown = false;

  categoryNames.forEach((name) => {
    name.innerHTML = name.innerHTML.replace(/\sИ\s/g, " И&nbsp;");
  });

  // Получаем все элементы категорий и соответствующие кнопки для применения эффектов.

  // Для каждой категории настраиваем эффекты при наведении мыши.
  categoriesContents.forEach((content, index) => {
    // Получаем соответствующую кнопку по индексу.
    const button = categoriesButtons[index];

    // Функция для применения эффекта при наведении.
    function hoverEffect() {
      button.style.border = "2px solid var(--color-lime)"; // Изменяем границу кнопки.
      button.style.backgroundColor = "var(--color-lime)"; // Меняем цвет фона кнопки.
      button.style.backgroundImage = 'url("./assets/icons/arrow-lavender.svg")'; // Меняем иконку на стрелку другого цвета.
      button.style.transition =
        "border 0.5s ease, background-color 0.5s ease, background-image 0.5s ease"; // Добавляем плавный переход для всех изменений.
    }

    // Функция для сброса эффекта при уходе курсора.
    function resetEffect() {
      button.style.border = "2px solid var(--color-lime)"; // Сбрасываем границу.
      button.style.backgroundColor = "rgba(235, 227, 255, 0.19)"; // Возвращаем прозрачный фон.
      button.style.backgroundImage = 'url("./assets/icons/arrow-lime.svg")'; // Возвращаем исходную иконку.
    }

    // Применяем эффекты при наведении и уходе курсора с элемента категории.
    content.addEventListener("mouseover", hoverEffect);
    content.addEventListener("mouseout", resetEffect);

    // Применяем такие же эффекты при наведении и уходе курсора с кнопки.
    button.addEventListener("mouseover", hoverEffect);
    button.addEventListener("mouseout", resetEffect);
  });

  // Обработка свайпа для touch-событий (на мобильных устройствах)
  categoriesList.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - categoriesList.offsetLeft;
    scrollLeft = categoriesList.scrollLeft;
  });

  categoriesList.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - categoriesList.offsetLeft;
    const walk = (x - startX) * 2; // Множитель скорости
    categoriesList.scrollLeft = scrollLeft - walk;
  });

  categoriesList.addEventListener("touchend", () => {
    isDown = false;
  });

  // Прокрутка при помощи мыши (Desktop)
  categoriesList.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - categoriesList.offsetLeft;
    scrollLeft = categoriesList.scrollLeft;
    categoriesList.classList.add("active"); // Добавляем класс для стилей
  });

  categoriesList.addEventListener("mouseleave", () => {
    isDown = false;
    categoriesList.classList.remove("active"); // Удаляем класс при уходе мыши
  });

  categoriesList.addEventListener("mouseup", () => {
    isDown = false;
    categoriesList.classList.remove("active"); // Удаляем класс при отпускании мыши
  });

  categoriesList.addEventListener("mousemove", (e) => {
    if (!isDown) return; // Останавливаем выполнение, если мышь не нажата
    e.preventDefault();
    const x = e.pageX - categoriesList.offsetLeft;
    const walk = (x - startX) * 2; // Множитель скорости
    categoriesList.scrollLeft = scrollLeft - walk;
  });
}
