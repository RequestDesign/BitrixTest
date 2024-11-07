// Главный экран
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.hero');

	const handleMouseOver = (event) => {
		const item = event.target.closest('.hero__item');
		if (item) {
			document.querySelectorAll('.hero__item').forEach((otherItem) => {
				otherItem
					.querySelector('.main-card')
					.classList.toggle('main-card--size-s', otherItem !== item);
			});
			item.querySelector('.main-card').classList.add('main-card--size-xl');
		}
	};

	const handleMouseOut = () => {
		document.querySelectorAll('.hero__item .main-card').forEach((card) => {
			card.classList.remove('main-card--size-xl', 'main-card--size-s');
		});
	};

	const applyEventListeners = () => {
		if (window.innerWidth > 1023) {
			container.addEventListener('mouseover', handleMouseOver);
			container.addEventListener('mouseout', handleMouseOut);
		} else {
			container.removeEventListener('mouseover', handleMouseOver);
			container.removeEventListener('mouseout', handleMouseOut);
		}
	};

	applyEventListeners();
	window.addEventListener('resize', applyEventListeners);
});

// Полоски
document.addEventListener('DOMContentLoaded', () => {
	const units = document.querySelectorAll('.lineages__unit');
	units.forEach((unit) => {
		const templateSpan = unit.querySelector('.lineages__text');
		const templateSvg = unit.querySelector('.lineages__icon');
		for (let i = 0; i < 7; i++) {
			const span = templateSpan.cloneNode(true);
			const svg = templateSvg.cloneNode(true);
			unit.appendChild(span);
			unit.appendChild(svg);
		}
	});
});

// модалка
document.addEventListener('DOMContentLoaded', () => {
	const modalContainer = document.getElementById('modal');
	const buttons = {
		purchase: document.getElementById('purchase-btn'),
		contacts: document.getElementById('contacts-btn'),
	};

	function openModal(modalContent, isXL = false) {
		document
			.querySelectorAll('.modal--open')
			.forEach((el) => el.classList.remove('modal--open', 'modal--size-xl'));
		modalContainer.classList.add('modal--open');
		modalContent.classList.add('modal--open');
		if (isXL) modalContainer.classList.add('modal--size-xl');
	}

	function closeModal() {
		document
			.querySelectorAll('.modal--open')
			.forEach((el) => el.classList.remove('modal--open', 'modal--size-xl'));
	}

	document.querySelectorAll('[data-modal-target]').forEach((button) =>
		button.addEventListener('click', () => {
			const targetModal = document.querySelector(
				button.getAttribute('data-modal-target'),
			);
			openModal(targetModal);
		}),
	);

	document.addEventListener('click', (event) => {
		if (
			event.target.matches('.modal__btn-close') ||
			event.target === modalContainer
		) {
			closeModal();
		}
	});

	Object.entries(buttons).forEach(([key, button]) => {
		if (button) {
			button.addEventListener('click', () => {
				const targetModal = document.querySelector(
					button.getAttribute('data-modal-target'),
				);
				openModal(targetModal, key === 'purchase' || key === 'contacts');
			});
		}
	});
});

// форма решистрации и входа
document.addEventListener('DOMContentLoaded', () => {
	const [btnReg, btnLogin] = [
		document.getElementById('btn-reg'),
		document.getElementById('btn-login'),
	];
	const [userLogin, userRegistration] = [
		document.querySelector('.modal__user-login'),
		document.querySelector('.modal__user-registration'),
	];

	const toggleModal = (showLogin) => {
		userLogin.classList.toggle('modal__user-login--active', showLogin);
		userRegistration.classList.toggle(
			'modal__user-registration--active',
			!showLogin,
		);
	};

	btnReg.addEventListener('click', () => toggleModal(false));
	btnLogin.addEventListener('click', () => toggleModal(true));
});

// кнопка оформить заказ
document.getElementById('ordering').addEventListener('click', (event) => {
	event.preventDefault();

	const [processElement, successElement] = [
		document.querySelector('.order__process'),
		document.querySelector('.order__success'),
	];

	processElement.classList.remove('order__process--open');
	successElement.classList.add('order__success--open');
});
