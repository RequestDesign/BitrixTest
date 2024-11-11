// Массив для хранения избранных товаров
export let favoriteItems = [];

// Функция для добавления товара в избранное
export function addToFavorites(product) {
  // Проверяем, есть ли уже этот товар в избранном
  const existingProduct = favoriteItems.find((item) => item.name === product.name);

  if (existingProduct) {
    // Если товар уже в избранном, выводим сообщение
    alert("Этот товар уже в избранном.");
  } else {
    // Добавляем товар в массив избранных товаров
    favoriteItems.push(product);

    // Обновляем модальное окно избранного
    const favoritesList = document.querySelector("#modal-favorites .favorites__list");
    if (favoritesList) {
      // Убираем символ ₽ из цены и добавляем его отдельно в DOM
      const priceWithoutCurrency = product.price.replace("₽", "").trim();

      // Создаем HTML для добавления товара в модальное окно избранного
      const favoriteItemHTML = `
        <div class="favorite-item" data-name="${product.name}">
          <div class="favorite-item__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="favorite-item__image" />
          </div>
          <div class="favorite-item__content">
            <div class="favorite-item__header">
              <div class="favorite-item__details">
                <div class="favorite-item__name-wrapper">
                  <div class="favorite-item__color-indicator" style="background-color: ${product.color_indicator};"></div>
                  <p class="favorite-item__name">${product.title}</p>
                </div>
                <p class="favorite-item__type">Лампа настольная</p>
              </div>
              <button class="favorite-item__favorite-btn"></button>
            </div>
            <div class="line"></div>
            <div class="favorite-item__footer">
              <p class="price favorite-item__price">
                ${priceWithoutCurrency}
                <span class="currency favorite-item__currency">₽</span>
              </p>
            </div>
          </div>
        </div>
      `;
      // Вставляем новый элемент в список избранного
      favoritesList.insertAdjacentHTML("beforeend", favoriteItemHTML);

      // Добавляем обработчик события для кнопки удаления товара
      const removeButton = favoritesList.querySelector(
        `.favorite-item[data-name="${product.name}"] .favorite-item__favorite-btn`
      );
      removeButton.addEventListener("click", () => removeFromFavorites(product.name));
    }

    // Проверяем состояние избранного (пустое или нет)
    checkFavoritesEmptyState();
  }
}

// Функция для удаления товара из избранного
export function removeFromFavorites(productName) {
  // Удаляем товар из массива избранных товаров
  favoriteItems = favoriteItems.filter((item) => item.name !== productName);

  // Удаляем товар из DOM
  const favoriteItemElement = document.querySelector(`.favorite-item[data-name="${productName}"]`);
  if (favoriteItemElement) {
    favoriteItemElement.remove();
  }

  // Проверяем состояние избранного
  checkFavoritesEmptyState();
}

// Функция для проверки состояния избранного (пустое или нет)
export function checkFavoritesEmptyState() {
  const favoritesModal = document.getElementById("modal-favorites");
  const modalTitle = favoritesModal.querySelector(".modal__title");
  const favoritesList = favoritesModal.querySelector(".favorites__list");
  const emptyMessage = favoritesModal.querySelector(".title-empty-message");

  // Если избранное пусто, скрываем заголовок и список, показываем сообщение о пустом списке
  if (favoriteItems.length === 0) {
    modalTitle.style.display = "none";
    favoritesList.style.display = "none";
    emptyMessage.style.display = "block";
  } else {
    // Если в избранном есть товары, показываем заголовок и список, скрываем сообщение о пустоте
    modalTitle.style.display = "block";
    favoritesList.style.display = "flex";
    emptyMessage.style.display = "none";
  }
}
