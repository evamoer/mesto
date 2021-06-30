//переменная для галереи карточек
const galleryListElement = document.querySelector('.gallery-table');
//переменная для контента темплейта карточки галереи
const galleryTemplateContent = document.querySelector('.gallery-item-template').content;
// массив с данными для карточек (названия и ссылки)
const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//переменные для всех попап-секций
const popupSection = document.querySelector('.popup');
const editProfilePopupSection = document.querySelector('.popup_type_edit-profile');
const addCardPopupSection = document.querySelector('.popup_type_add-card');
const fullImagePopupSection = document.querySelector('.popup_type_full-image');
//переменные для попапа редактирования профиля
const editProfilePopupContainer = editProfilePopupSection.querySelector('.popup__container_type_edit-profile');
const editProfilePopupForm = editProfilePopupContainer.querySelector('.popup__form');
const profileNamePopupFormInput = editProfilePopupContainer.querySelector('.popup__input_type_profile-name');
const profileAboutPopupFormInput = editProfilePopupContainer.querySelector('.popup__input_type_profile-about');
//переменные элементов из секции профиля, которые должны измениться после редактирования
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');
//переменные для попапа добавления карточки
const addCardPopupContainer = addCardPopupSection.querySelector('.popup__container_type_add-card');
const addCardPopupForm = addCardPopupContainer.querySelector('.popup__form');
const cardTitlePopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-title');
const cardLinkPopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-link');
//переменные для попапа полного изображения
const fullImagePopupContainer = fullImagePopupSection.querySelector('.popup__container_type_full-image');
const fullImageElement = fullImagePopupContainer.querySelector('.popup__full-image');
const fullImageCaption = fullImagePopupContainer.querySelector('.popup__full-image-caption');
const closeFullImageButton = fullImagePopupContainer.querySelector('.button_type_close');
//переменные для кнопок открытия и закрытия попапов
const openEditProfileButton = document.querySelector('.button_type_edit');
const closeEditProfileButton = editProfilePopupContainer.querySelector('.button_type_close');
const openAddCardButton = document.querySelector('.button_type_add');
const closeAddCardButton = addCardPopupContainer.querySelector('.button_type_close');

//функция закрытия полного изображения
function closeFullImage () {
  fullImagePopupSection.classList.remove('popup_opened');
  fullImagePopupContainer.classList.remove('popup__container_opened');
}

//функция открытия полного изображения
function openFullImage (evt) {
  fullImagePopupSection.classList.add('popup_opened');
  fullImagePopupContainer.classList.add('popup__container_opened');
  fullImageElement.src = evt.target.src;
  fullImageElement.alt = evt.target.alt;
  fullImageCaption.textContent = evt.target.alt;
  //отслеживаем клик по кнопке закрытия
  closeFullImageButton.addEventListener('click', closeFullImage);
}

//функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.gallery-table__item').remove();
}

//функция работы кнопки лайка
function likeCard (evt) {
  evt.target.classList.toggle('button_type_like-active');
}

//функция для создания и наполнения карточки из массива
function renderInitialPlace (item) {
  const initialPlaceItem = galleryTemplateContent.cloneNode(true); //клонируем в DOM элемент карточки
  const initialPlaceItemImage = initialPlaceItem.querySelector('.card__image');
  const initialPlaceItemTitle = initialPlaceItem.querySelector('.card__title');
  const initialPlaceItemImageContainer = initialPlaceItem.querySelector('.card__image-container');
  const deleteInitialPlaceButton = initialPlaceItem.querySelector('.button_type_delete-card');
  const likeInitialPlaceButton = initialPlaceItem.querySelector('.button_type_like');
  initialPlaceItemImage.src = item.link;
  initialPlaceItemImage.alt = item.name;
  initialPlaceItemTitle.textContent = item.name;
  //вывод готовой карточки в галерею
  galleryListElement.append(initialPlaceItem);
  //слушатели карточки: лайк, корзина, полное изображение
  initialPlaceItemImageContainer.addEventListener('click', openFullImage);
  deleteInitialPlaceButton.addEventListener('click', deleteCard);
  likeInitialPlaceButton.addEventListener('click', likeCard);
};

//функция для обработки каждого элемента из массива с карточками
function renderInitialPlaces (items) {
  items.forEach(renderInitialPlace);
};

//вызов функции для обработки и вывода массива с карточками
renderInitialPlaces (items);

//функция открытия попапа редактирования профиля
const openEditProfilePopup = function () {
  //автозаполнение значений инпутов формы
  profileNamePopupFormInput.value = profileNameElement.textContent;
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  editProfilePopupSection.classList.add('popup_opened');
  editProfilePopupContainer.classList.add('popup__container_opened');
}
//функция закрытия попапа редактирования профиля
const closeEditProfilePopup = function () {
  editProfilePopupContainer.classList.remove('popup__container_opened');
  editProfilePopupSection.classList.remove('popup_opened');
}

//функция сохранения изменений в профиле по сабмиту
function editProfileFormSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileNameElement.textContent =  profileNamePopupFormInput.value;
    profileAboutElement.textContent = profileAboutPopupFormInput.value;
    closeEditProfilePopup(); //попап закрывается при сохранении формы
};

//функция открытия попапа добавления карточки
const openAddCardPopup = function() {
  addCardPopupSection.classList.add('popup_opened');
  addCardPopupContainer.classList.add('popup__container_opened');
}

//функция закрытия попапа добавления карточки
const closeAddCardPopup = function () {
  addCardPopupContainer.classList.remove('popup__container_opened');
  addCardPopupSection.classList.remove('popup_opened');
}

//функция для очищения полей инпутов в форме добавления карточки
const clearAddCardFormInputs = function () {
    cardTitlePopupFormInput.value = '';
    cardLinkPopupFormInput.value = '';
};

//функция создания новой карточки и её добавления в начало галереи
const renderNewPlace = function () {
  const newPlaceItem = galleryTemplateContent.cloneNode(true); //клонируем в DOM
  const newPlaceItemTitle = newPlaceItem.querySelector('.card__title');
  const newPlaceItemImage = newPlaceItem.querySelector('.card__image');
  const newPlaceItemImageContainer = newPlaceItem.querySelector('.card__image-container');
  const deleteNewPlaceButton = newPlaceItem.querySelector('.button_type_delete-card');
  const likeNewPlaceButton = newPlaceItem.querySelector('.button_type_like');
  newPlaceItemTitle.textContent = cardTitlePopupFormInput.value;
  newPlaceItemImage.src = cardLinkPopupFormInput.value;
  newPlaceItemImage.alt = cardTitlePopupFormInput.value;
  //добавление карточки в начало галереи
  galleryListElement.prepend(newPlaceItem);
  newPlaceItemImageContainer.addEventListener('click', openFullImage);
  deleteNewPlaceButton.addEventListener('click', deleteCard);
  likeNewPlaceButton.addEventListener('click', likeCard);
};

//функция добавления карточки в галереию по сабмиту
function addCardPopupFormSubmitHandler (evt) {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
  renderNewPlace();
  closeAddCardPopup();
  clearAddCardFormInputs();
}

//слушатели попапов и сабмитов форм
editProfilePopupForm.addEventListener('submit', editProfileFormSubmitHandler);
openEditProfileButton.addEventListener('click', openEditProfilePopup);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);
addCardPopupForm.addEventListener('submit', addCardPopupFormSubmitHandler);
openAddCardButton.addEventListener('click', openAddCardPopup);
closeAddCardButton.addEventListener('click', closeAddCardPopup);
