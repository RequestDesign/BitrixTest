import { addToCart } from "./cart.js";
import { addToFavorites, removeFromFavorites, favoriteItems } from "./favorites.js";

export function initializeProducts() {
  const categoriesItems = document.querySelectorAll(".categories__item");
  const productsSection = document.getElementById("products-section");
  const loadMoreButton = document.getElementById("load-more");
  const productsList = document.getElementById("products-list");

  const productModal = document.querySelector(".product-modal");
  const modalCloseButton = productModal.querySelector(".product-modal__close");
  const modalImage = productModal.querySelector(".product-modal__image");
  const modalTitle = productModal.querySelector(".product-modal__title");
  const modalDescription = productModal.querySelector(".product-modal__description");
  const modalPriceAmount = productModal.querySelector(".product-modal__price");

  const mobileModal = document.getElementById("productMobileModal");
  const mobileModalList = document.getElementById("productListMobile");
  const closeModalButton = document.getElementById("productMobileCloseModal");

  let currentPage = 1;
  const productsPerPage = 5;
  let currentCategory = null;

  let productsData = {}; // Данные о продуктах будут загружены сюда

  // Загружаем данные о продуктах через fetch
  fetch("./assets/js/products.json")
    .then((response) => response.json())
    .then((data) => {
      productsData = data; // Сохраняем загруженные данные
    })
    .catch((error) => console.error("Ошибка при загрузке данных:", error));

  // Навешиваем обработчики событий для категорий
  categoriesItems.forEach((item) => {
    item.addEventListener("click", () => {
      const clickedCategory = item.getAttribute("data-category");

      if (window.innerWidth <= 520) {
        // Если ширина экрана <= 520px, показываем модальное окно
        openMobileModal(clickedCategory);
      } else {
        // Обычное поведение для больших экранов
        if (clickedCategory === currentCategory) {
          productsSection.classList.remove("active");
          productsSection.classList.add("hiding");

          setTimeout(() => {
            productsSection.classList.remove("hiding");
            productsSection.style.visibility = "hidden";
          }, 500);
          currentCategory = null;
        } else {
          currentCategory = clickedCategory;
          currentPage = 1;

          productsSection.style.visibility = "visible";
          productsSection.classList.add("active");
          loadProducts(); // Загружаем продукты для выбранной категории

          if (productsData[currentCategory].length > productsPerPage) {
            loadMoreButton.style.display = "block";
          } else {
            loadMoreButton.style.display = "none";
          }
        }
      }
    });
  });

  // Функция для загрузки продуктов на страницу
  function loadProducts() {
    if (currentPage === 1) {
      productsList.innerHTML = ""; // Очищаем список перед первой загрузкой
    }

    // Определяем количество продуктов для текущей страницы
    const productsToLoad = productsData[currentCategory].slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );

    // Добавляем каждый продукт в список
    productsToLoad.forEach((product, index) => {
      const productHTML = `
        <div class="product-card">
          <div class="product-card__image">
            <div 
              class="product-color-indicator" 
              style="background-color: ${product.color_indicator};">
            </div>
            <img src="${product.image}" alt="${product.name}">
          </div>
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__description">Зеркало напольное</p>
          <div class="product-card__footer">
            <div class="product-card__price--wrapper">
              <span class="price product-card__price">
                ${product.price}
                <span class="currency product-card__currency">₽</span>
              </span>
            </div>
            <button class="buy-button">
              <div class="icons"></div>
              <span class="buy-button__text">Купить</span>
            </button>
          </div>
        </div>
      `;
      productsList.innerHTML += productHTML; // Добавляем карточку продукта
    });

    // Показываем карточки продуктов с задержкой для анимации
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 50); // Задержка для каждого продукта
    });

    addBuyButtonListeners(); // Добавляем обработчики кнопки покупки

    currentPage++;

    // Скрываем кнопку "Загрузить еще", если больше продуктов нет
    if (productsData[currentCategory].length <= currentPage * productsPerPage) {
      loadMoreButton.style.display = "none";
    }
  }

  // Обработчик кнопки "Загрузить еще"
  document.getElementById("load-more").addEventListener("click", () => {
    loadProducts();
  });

  // Добавляем обработчики на кнопки покупки
  function addBuyButtonListeners() {
    const buyButtons = document.querySelectorAll(".buy-button");

    buyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productCard = button.closest(".product-card");
        const product = {
          name: productCard.querySelector(".product-card__name").textContent,
          price: productCard.querySelector(".product-card__price").textContent.trim(),
          color_indicator: productCard.querySelector(".product-color-indicator").style
            .backgroundColor,
          image: productCard.querySelector("img").src,
          quantity: 1, // Начальное количество товара
        };

        addToCartWithAnimation(product, productCard); // Добавляем товар в корзину с анимацией
      });
    });
  }

  // Функция для добавления товара в корзину с анимацией
  function addToCartWithAnimation(product, imageElement) {
    const cartIcon = document.querySelector('.header__link img[alt="Корзина"]');

    // Клонируем изображение товара для анимации
    const productImage = imageElement.cloneNode(true);
    const productImageRect = imageElement.getBoundingClientRect();
    const cartIconRect = cartIcon.getBoundingClientRect();

    // Настраиваем стили для анимации перемещения изображения
    productImage.style.position = "fixed";
    productImage.style.left = `${productImageRect.left}px`;
    productImage.style.top = `${productImageRect.top}px`;
    productImage.style.width = `${productImageRect.width}px`;
    productImage.style.height = `${productImageRect.height}px`;
    productImage.style.zIndex = "100";
    productImage.style.transition = "all 1s ease";
    document.body.appendChild(productImage);

    // Запускаем анимацию перемещения к иконке корзины
    setTimeout(() => {
      productImage.style.left = `${cartIconRect.left}px`;
      productImage.style.top = `${cartIconRect.top}px`;
      productImage.style.width = "30px";
      productImage.style.height = "30px";
      productImage.style.opacity = "0.5";
    }, 10);

    // Удаляем изображение после завершения анимации и добавляем товар в корзину
    setTimeout(() => {
      productImage.remove();
      addToCart(product); // Добавляем товар в корзину через cart.js
    }, 1000);
  }

  // Открытие модального окна продукта
  function openProductModal(product) {
    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;

    const buyButton = productModal.querySelector(".product-modal__buy-button");

    if (buyButton) {
      // Удаляем предыдущие обработчики, чтобы избежать дублирования
      buyButton.replaceWith(buyButton.cloneNode(true));
      const newBuyButton = productModal.querySelector(".product-modal__buy-button");

      // Обработчик кнопки покупки в модальном окне
      newBuyButton.addEventListener("click", () => {
        const imageElement = productModal.querySelector(".product-modal__image");

        const cartProduct = {
          name: modalTitle.textContent.trim(),
          price: modalPriceAmount.textContent.trim(),
          color_indicator: "", // Цвет, если применимо
          image: imageElement.src,
          quantity: 1,
        };

        addToCartWithAnimation(cartProduct, imageElement);
      });
    }

    // Обновляем цену в модальном окне
    if (modalPriceAmount) {
      const priceWithoutCurrency = product.price.replace("₽", "").trim();
      modalPriceAmount.textContent = priceWithoutCurrency;
    }

    // Устанавливаем стили модального окна
    productModal.querySelector(".product-modal__content").style.backgroundColor =
      product.backgroundColor;

    productModal.style.backgroundColor = product.backgroundColor;
    modalTitle.style.color = product.titleColor;

    productModal.classList.add("product-modal--show");
    productModal.classList.remove("product-modal--hidden");

    // Обработчик кнопки добавления в избранное
    const favoriteButton = productModal.querySelector(".product-modal__favorite");
    if (favoriteButton) {
      // Проверяем, добавлен ли продукт в избранное
      const isFavorited = favoriteItems.some((item) => item.id === product.id);
      if (isFavorited) {
        favoriteButton.classList.add("favorited");
      } else {
        favoriteButton.classList.remove("favorited");
      }

      // Удаляем существующие обработчики, чтобы избежать дублирования
      favoriteButton.replaceWith(favoriteButton.cloneNode(true));
      const newFavoriteButton = productModal.querySelector(".product-modal__favorite");

      // Добавляем или удаляем продукт из избранного
      newFavoriteButton.addEventListener("click", () => {
        if (newFavoriteButton.classList.contains("favorited")) {
          // Удаляем из избранного
          removeFromFavorites(product.id);
          newFavoriteButton.classList.remove("favorited");
        } else {
          // Добавляем в избранное
          addToFavorites(product);
          newFavoriteButton.classList.add("favorited");
        }
      });
    }
  }

  // Закрытие модального окна
  function closeProductModal() {
    productModal.classList.remove("product-modal--show");
    setTimeout(() => {
      productModal.classList.add("product-modal--hidden");
    }, 400);
  }

  // Обработчик закрытия модального окна
  modalCloseButton.addEventListener("click", closeProductModal);

  // Обработчик кнопок покупки в слайдере
  document.querySelectorAll(".slider__button").forEach((buyButton) => {
    buyButton.addEventListener("click", function (event) {
      event.stopPropagation();

      const sliderItem = buyButton.closest(".slider__item");
      const imageElement = sliderItem.querySelector(".slider__image");

      const product = {
        name: sliderItem.querySelector(".slider__title").textContent.trim(),
        price: sliderItem.querySelector(".slider__price").textContent.trim(),
        color_indicator: "", // Цвет, если применимо
        image: imageElement.src,
        quantity: 1,
      };

      addToCartWithAnimation(product, imageElement);
    });
  });

  // Обработчик для открытия модального окна при клике на изображение в слайдере
  document.querySelectorAll(".slider__image").forEach((sliderImage, index) => {
    sliderImage.addEventListener("click", function (event) {
      event.stopPropagation();

      const sliderItem = sliderImage.closest(".slider__item");
      const sliderTitle = sliderItem.querySelector(".slider__title");
      const titleColor = window.getComputedStyle(sliderTitle).color;
      const dataSlide = sliderItem.getAttribute("data-slide");

      const product = {
        id: dataSlide,
        image: sliderImage.src,
        name: sliderItem.querySelector(".slider__title").textContent.trim(),
        title: sliderItem.querySelector(".slider__title").textContent,
        description: sliderItem.querySelector(".slider__description").textContent,
        price: sliderItem.querySelector(".slider__price").textContent.trim(),
        backgroundColor: window.getComputedStyle(sliderItem).backgroundColor,
        titleColor: titleColor,
        color_indicator: "", // Если применимо
      };
      if (index === 0) {
        product.backgroundColor = "#AE97E8";
      }
      openProductModal(product);
    });
  });

  // Функция для открытия модального окна на мобильных устройствах
  function openMobileModal(category) {
    currentCategory = category;
    mobileModal.classList.add("active");

    // Загружаем продукты в модальное окно
    loadMobileProducts();
  }

  // Функция для загрузки продуктов в мобильное модальное окно
  function loadMobileProducts() {
    // Очищаем список перед загрузкой
    mobileModalList.innerHTML = "";

    const productsToLoad = productsData[currentCategory];

    productsToLoad.forEach((product) => {
      const priceWithoutCurrency = product.price.replace("₽", "").trim();

      const productHTML = `
      <div class="product-mobile-item" data-name="${product.name}">
        <div class="product-mobile__image-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-mobile__image" />
        </div>
        <div class="product-mobile__content">
          <div class="product-mobile__header">
            <div class="product-mobile__details">
              <div class="product-mobile__name-wrapper">
                <div class="product-mobile__color-indicator" style="background-color: ${product.color_indicator};"></div>
                <p class="product-mobile__name">${product.name}</p>
              </div>
              <p class="product-mobile__type">Лампа настольная</p>
            </div>
          </div>
          <div class="line"></div>
          <div class="product-mobile__footer">
            <p class="price product-mobile__price">
              ${priceWithoutCurrency}
              <span class="currency product-mobile__currency">₽</span>
            </p>
            <button class="product-mobile__button">
              <div class='icon'></div>
              Купить
            </button>
          </div>
        </div>
      </div>
    `;
      mobileModalList.innerHTML += productHTML;
    });

    // Добавляем обработчики событий на кнопки "Купить"
    addMobileBuyButtonListeners();
  }

  // Функция для добавления обработчиков на кнопки покупки в мобильном модальном окне
  function addMobileBuyButtonListeners() {
    const mobileBuyButtons = document.querySelectorAll(".product-mobile__button");

    mobileBuyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productItem = button.closest(".product-mobile-item");
        const product = {
          name: productItem.querySelector(".product-mobile__name").textContent.trim(),
          price: productItem.querySelector(".product-mobile__price").textContent.trim(),
          color_indicator: productItem.querySelector(".product-mobile__color-indicator").style
            .backgroundColor,
          image: productItem.querySelector(".product-mobile__image").src,
          quantity: 1,
        };

        const imageElement = productItem.querySelector(".product-mobile__image");

        // Добавляем товар в корзину с анимацией
        addToCartWithAnimation(product, imageElement);
      });
    });
  }

  // Закрытие модального окна
  closeModalButton.addEventListener("click", () => {
    mobileModal.classList.remove("active");
  });
}
