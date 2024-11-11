// Инициализируем массив товаров в корзине
export let cartItems = [];

// Функция добавления товара в корзину
export function addToCart(product) {
  // Проверяем, существует ли товар уже в корзине
  const existingProduct = cartItems.find((item) => item.name === product.name);

  if (existingProduct) {
    // Если товар уже в корзине, увеличиваем его количество
    existingProduct.quantity++;

    // Обновляем количество товара в интерфейсе
    const cartItemElement = document.querySelector(`[data-name="${existingProduct.name}"]`);
    const quantityValueElement = cartItemElement.querySelector(".cart-item__quantity-value");
    quantityValueElement.textContent = existingProduct.quantity;
  } else {
    // Если товар отсутствует в корзине, добавляем его как новый
    const priceWithoutCurrency = product.price.replace("₽", "").trim(); // Убираем валютный знак из цены
    const cartItemHTML = `
      <div class="cart-item" data-name="${product.name}">
        <div class="cart-item__image-wrapper">
          <img src="${product.image}" alt="${product.name}" class="cart-item__image" />
        </div>
        <div class="cart-item__content">
          <div class="cart-item__header">
            <div class="cart-item__details">
              <div class="cart-item__name-wrapper">
                <div class="cart-item__color-indicator" style="background-color: ${product.color_indicator};"></div>
                <p class="cart-item__name">${product.name}</p>
              </div>
              <p class="cart-item__type">Лампа настольная</p>
            </div>
            <button class="cart-item__remove"></button>
          </div>
          <div class="line"></div>
          <div class="cart-item__footer">
            <p class="price cart-item__price">
              ${priceWithoutCurrency}
              <span class="currency cart-item__currency">₽</span>
            </p>
            <div class="cart-item__quantity">
              <button class="cart-item__button cart-item__button--minus">−</button>
              <span class="cart-item__quantity-value">${product.quantity}</span>
              <button class="cart-item__button cart-item__button--plus">+</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Вставляем новый товар в HTML корзины
    const cartList = document.querySelector(".cart__list");
    cartList.insertAdjacentHTML("beforeend", cartItemHTML);

    // Добавляем товар в массив корзины
    cartItems.push(product);

    // Добавляем обработчики событий для изменения количества товаров
    addQuantityListeners();
  }

  // Обновляем общую сумму товаров в корзине
  updateTotalAmount();
  // Проверяем, пустая ли корзина
  checkCartEmptyState();
}

// Функция обновления общей суммы товаров в корзине
export function updateTotalAmount() {
  const totalAmountElement = document.querySelector(".cart__total-amount");

  // Рассчитываем общую сумму, убираем пробелы из цены и умножаем на количество товаров
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseInt(item.price.replace(/\s/g, "")) * item.quantity,
    0
  );

  // Отображаем общую сумму в элементе с разделением тысяч
  totalAmountElement.innerHTML = `${totalAmount.toLocaleString()} <span class="currency cart__total-currency">₽</span>`;
}

// Функция проверки, пустая ли корзина
export function checkCartEmptyState() {
  const cartModal = document.getElementById("modal-cart");
  const modalTitle = cartModal.querySelector(".modal__title");
  const cartList = cartModal.querySelector(".cart__list");
  const cartFooter = cartModal.querySelector(".cart__footer");
  const emptyMessage = cartModal.querySelector(".title-empty-message");

  // Если корзина пустая, скрываем заголовок, список и подвал, показываем сообщение
  if (cartItems.length === 0) {
    modalTitle.style.visibility = "hidden";
    cartList.style.display = "none";
    cartFooter.style.display = "none";
    emptyMessage.style.display = "block";
  } else {
    // Если в корзине есть товары, отображаем заголовок, список и подвал, скрываем сообщение
    modalTitle.style.visibility = "visible";
    cartList.style.display = "block";
    cartFooter.style.display = "flex";
    emptyMessage.style.display = "none";
  }
}

// Функция добавления обработчиков событий для кнопок увеличения/уменьшения количества и удаления товаров
export function addQuantityListeners() {
  const cartItemElements = document.querySelectorAll(".cart-item");

  cartItemElements.forEach((cartItemElement) => {
    // Получаем элементы кнопок и значения количества
    const minusButton = cartItemElement.querySelector(".cart-item__button--minus");
    const plusButton = cartItemElement.querySelector(".cart-item__button--plus");
    const removeButton = cartItemElement.querySelector(".cart-item__remove");
    const quantityValueElement = cartItemElement.querySelector(".cart-item__quantity-value");
    const itemName = cartItemElement.getAttribute("data-name");

    // Находим соответствующий товар в массиве корзины
    const product = cartItems.find((item) => item.name === itemName);

    // Удаляем предыдущие обработчики событий, чтобы избежать дублирования
    minusButton.replaceWith(minusButton.cloneNode(true));
    plusButton.replaceWith(plusButton.cloneNode(true));
    removeButton.replaceWith(removeButton.cloneNode(true));

    // Обновляем ссылки на новые кнопки
    const updatedMinusButton = cartItemElement.querySelector(".cart-item__button--minus");
    const updatedPlusButton = cartItemElement.querySelector(".cart-item__button--plus");
    const updatedRemoveButton = cartItemElement.querySelector(".cart-item__remove");

    // Добавляем обработчик для уменьшения количества товара
    updatedMinusButton.addEventListener("click", () => {
      if (product.quantity > 1) {
        product.quantity--; // Уменьшаем количество товара
        quantityValueElement.textContent = product.quantity; // Обновляем количество в интерфейсе
        updateTotalAmount(); // Обновляем общую сумму
      }
    });

    // Добавляем обработчик для увеличения количества товара
    updatedPlusButton.addEventListener("click", () => {
      product.quantity++; // Увеличиваем количество товара
      quantityValueElement.textContent = product.quantity; // Обновляем количество в интерфейсе
      updateTotalAmount(); // Обновляем общую сумму
    });

    // Добавляем обработчик для удаления товара из корзины
    updatedRemoveButton.addEventListener("click", () => {
      cartItemElement.classList.add("cart-item--removing"); // Добавляем анимацию удаления

      // Удаляем товар через 500 миллисекунд (время анимации)
      setTimeout(() => {
        cartItems = cartItems.filter((item) => item.name !== itemName); // Удаляем товар из массива
        cartItemElement.remove(); // Удаляем элемент из DOM

        updateTotalAmount(); // Обновляем общую сумму
        checkCartEmptyState(); // Проверяем, пустая ли корзина
      }, 500);
    });
  });
}
