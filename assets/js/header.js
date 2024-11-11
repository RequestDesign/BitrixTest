import { checkCartEmptyState } from "./cart.js";
import { checkFavoritesEmptyState } from "./favorites.js";

export function initializeHeader() {
  // Получаем элементы модальных окон
  const cartModal = document.getElementById("modal-cart");
  const favoritesModal = document.getElementById("modal-favorites");
  const loginModal = document.getElementById("modal-login");
  const registrationModal = document.getElementById("modal-registration");
  const closeButtons = document.querySelectorAll(".modal__close");

  let scrollPosition = 0;

  // Функция закрытия всех модальных окон
  function closeAllModals() {
    const allModals = [cartModal, favoritesModal, loginModal, registrationModal];
    allModals.forEach((modal) => {
      if (modal.classList.contains("modal--show")) {
        closeModal(modal);
      }
    });
  }

  // Функция открытия модального окна
  function openModal(modal) {
    if (!modal.classList.contains("modal--show")) {
      closeAllModals(modal); // Закрываем другие модальные окна
      modal.classList.add("modal--show");
      modal.classList.remove("modal--hidden");

      // Добавляем активный класс к modal-wrapper
      document.querySelector(".modal-wrapper").classList.add("modal-wrapper--active");

      // Отключаем слайдер при открытии модального окна
      document.querySelector(".main-content").classList.add("no-slider");

      // Проверяем состояние корзины или избранного при открытии соответствующих окон
      if (modal === cartModal) {
        checkCartEmptyState();
      } else if (modal === favoritesModal) {
        checkFavoritesEmptyState();
      }

      if (window.innerWidth <= 510) {
        // Сохраняем текущую позицию прокрутки
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Добавляем класс к body и устанавливаем позицию
        document.body.classList.add("modal-open");
        document.body.style.top = `-${scrollPosition}px`;
      }
    }
  }

  // Функция закрытия модального окна
  function closeModal(modal) {
    modal.classList.remove("modal--show");
    setTimeout(() => {
      modal.classList.add("modal--hidden");
    }, 400); // Задержка для анимации

    // Удаляем активный класс из modal-wrapper
    document.querySelector(".modal-wrapper").classList.remove("modal-wrapper--active");

    // Включаем слайдер после закрытия модального окна
    document.querySelector(".main-content").classList.remove("no-slider");

    if (document.body.classList.contains("modal-open")) {
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }
  }

  // Добавляем события открытия для кнопок модальных окон (корзина, избранное, вход, регистрация)
  const cartButton = document.querySelector('.header__link img[alt="Корзина"]');
  if (cartButton) cartButton.addEventListener("click", () => openModal(cartModal));

  const favoritesButton = document.querySelector('.header__link img[alt="Избранное"]');
  if (favoritesButton) favoritesButton.addEventListener("click", () => openModal(favoritesModal));

  const profileButton = document.querySelector('.header__link img[alt="Вход"]');
  if (profileButton) profileButton.addEventListener("click", () => openModal(loginModal));

  const registrationButton = document.querySelector('.header__link img[alt="Регистрация"]');
  if (registrationButton)
    registrationButton.addEventListener("click", () => openModal(registrationModal));

  // Добавляем события для закрытия модальных окон при клике на кнопки закрытия
  closeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const modal = event.target.closest(".modal");
      closeModal(modal);
    });
  });

  // Переключение между окнами входа и регистрации
  const switchToRegistration = document.getElementById("switch-to-registration");
  const switchToLogin = document.getElementById("switch-to-login");

  switchToRegistration.addEventListener("click", function (e) {
    e.preventDefault();
    // Закрываем окно входа и открываем окно регистрации с задержкой для анимации
    loginModal.classList.remove("modal--show");
    setTimeout(() => {
      loginModal.classList.add("modal--hidden");
      registrationModal.classList.remove("modal--hidden");
      registrationModal.classList.add("modal--show");
    }, 400);
  });

  switchToLogin.addEventListener("click", function (e) {
    e.preventDefault();
    // Закрываем окно регистрации и открываем окно входа с задержкой для анимации
    registrationModal.classList.remove("modal--show");
    setTimeout(() => {
      registrationModal.classList.add("modal--hidden");
      loginModal.classList.remove("modal--hidden");
      loginModal.classList.add("modal--show");
    }, 400);
  });

  // Добавляем события для изменения стилей input при вводе текста
  document.querySelectorAll(".modal__field").forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.value.trim() !== "") {
        input.parentElement.classList.add("input--filled");
      } else {
        input.parentElement.classList.remove("input--filled");
      }
    });

    // Если поле уже заполнено, добавляем класс при загрузке
    if (input.value.trim() !== "") {
      input.parentElement.classList.add("input--filled");
    }
  });

  // Функция валидации email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Валидация формы входа
  function validateLoginForm(event) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    resetErrors([emailInput, passwordInput]); // Сброс предыдущих ошибок

    let isValid = true;

    // Проверка email
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Некорректный формат email");
      isValid = false;
    }

    // Проверка пароля
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Пароль не должен быть пустым");
      isValid = false;
    }

    // Останавливаем отправку формы, если данные неверные
    if (!isValid) {
      event.preventDefault();
    }
  }

  // Валидация формы регистрации
  function validateRegistrationForm(event) {
    const emailInput = document.getElementById("reg-email");
    const passwordInput = document.getElementById("reg-password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    resetErrors([emailInput, passwordInput, confirmPasswordInput]); // Сброс предыдущих ошибок

    let isValid = true;

    // Проверка email
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Некорректный формат email");
      isValid = false;
    }

    // Проверка пароля
    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Пароль не должен быть пустым");
      isValid = false;
    }

    // Проверка подтверждения пароля
    if (!confirmPasswordInput.value.trim()) {
      showError(confirmPasswordInput, "Подтверждение пароля не должно быть пустым");
      isValid = false;
    }

    // Проверка совпадения паролей
    if (passwordInput.value !== confirmPasswordInput.value) {
      showError(confirmPasswordInput, "Пароли не совпадают");
      isValid = false;
    }

    // Останавливаем отправку формы, если данные неверные
    if (!isValid) {
      event.preventDefault();
    }
  }

  // Функция отображения ошибки
  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.innerText = message;
    input.parentElement.appendChild(errorElement);
    input.classList.add("input-error");
  }

  // Сброс ошибок
  function resetErrors(inputs) {
    inputs.forEach((input) => {
      const errorMessage = input.parentElement.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
      input.classList.remove("input-error");
    });
  }

  // Привязываем события валидации к формам
  const loginForm = document.querySelector("#modal-login .modal__form");
  const registrationForm = document.querySelector("#modal-registration .modal__form");

  if (loginForm) {
    loginForm.addEventListener("submit", validateLoginForm);
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", validateRegistrationForm);
  }

  // Открытие поиска по нажатию на кнопку
  document.getElementById("header__link--search").addEventListener("click", function (e) {
    e.preventDefault();
    const overlay = document.querySelector(".search-overlay");
    overlay.style.display = "flex"; // Показываем элемент
    setTimeout(() => {
      overlay.classList.add("active"); // Запускаем анимацию
    }, 10);
  });

  // Закрытие поиска
  document.querySelector(".search-bar__close").addEventListener("click", function () {
    const overlay = document.querySelector(".search-overlay");
    overlay.classList.remove("active");
    setTimeout(() => {
      overlay.style.display = "none"; // Прячем элемент после завершения анимации
    }, 500);
  });
}
