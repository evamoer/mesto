//переменная для галереи карточек
const galleryListElement = document.querySelector('.gallery-table');
//переменная для контента темплейта карточки галереи
const galleryTemplateContent = document.querySelector('.gallery-item-template').content;
//переменные для всех попап-секций
const popupElement = document.querySelector('.popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
const editProfilePopupElement = document.querySelector('.popup_type_edit-profile');
const addCardPopupElement = document.querySelector('.popup_type_add-card');
const fullImagePopupElement = document.querySelector('.popup_type_full-image');
//переменные для попапа редактирования профиля
const editProfilePopupForm = editProfilePopupElement.querySelector('.popup__form');
const profileNamePopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-name');
const profileAboutPopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-about');
//переменные элементов из секции профиля, которые должны измениться после редактирования
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');
//переменные для попапа добавления карточки
const addCardPopupForm = addCardPopupElement.querySelector('.popup__form');
const cardTitlePopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-title');
const cardLinkPopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-link');
//переменные для попапа полного изображения
const fullImagePopupContainer = fullImagePopupElement.querySelector('.popup__container_type_full-image');
const fullImageElement = fullImagePopupContainer.querySelector('.popup__full-image');
const fullImageCaption = fullImagePopupContainer.querySelector('.popup__full-image-caption');
const closeFullImageButton = fullImagePopupContainer.querySelector('.button_type_close');
//переменные для кнопок открытия и закрытия попапов
const openEditProfileButton = document.querySelector('.button_type_edit');
const closeEditProfileButton = editProfilePopupElement.querySelector('.button_type_close');
const openAddCardButton = document.querySelector('.button_type_add');
const closeAddCardButton = addCardPopupElement.querySelector('.button_type_close');

//функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//функция закрытия полного изображения
function closeFullImage () {
  closePopup(fullImagePopupElement);
};

//функция открытия полного изображения
function openFullImage (evt) {
  openPopup(fullImagePopupElement);
  fullImageElement.src = evt.target.src;
  fullImageElement.alt = evt.target.alt;
  fullImageCaption.textContent = evt.target.alt;
  document.addEventListener('keydown', closePopupWithEscButton);
}

//функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.gallery-table__item').remove();
}

//функция работы кнопки лайка
function likeCard (evt) {
  evt.target.classList.toggle('button_type_like-active');
}

//функция создания новой карточки в DOM
function createCard(item) {
  const placeItem = galleryTemplateContent.cloneNode(true); //клонируем в DOM элемент карточки
  const placeItemImage = placeItem.querySelector('.card__image');
  const placeItemTitle = placeItem.querySelector('.card__title');
  const placeItemImageContainer = placeItem.querySelector('.card__image-container');
  const deletePlaceButton = placeItem.querySelector('.button_type_delete-card');
  const likePlaceButton = placeItem.querySelector('.button_type_like');
  placeItemImage.src = item.link;
  placeItemImage.alt = item.name;
  placeItemTitle.textContent = item.name;
  //слушатели карточки: лайк, корзина, полное изображение
  placeItemImageContainer.addEventListener('click', openFullImage);
  deletePlaceButton.addEventListener('click', deleteCard);
  likePlaceButton.addEventListener('click', likeCard);
  return placeItem;
}

//функция для добавления в галерею карточек из массива
function appendInitialPlaceItem (item) {
  const initialPlaceItem = createCard(item);
  //вывод готовой карточки в галерею
  galleryListElement.append(initialPlaceItem);
};

//функция для обработки каждого элемента из массива с карточками
function renderInitialPlaces (items) {
  items.forEach(appendInitialPlaceItem);
};

//вызов функции для обработки массива с карточками
renderInitialPlaces (items);

//функция открытия попапа редактирования профиля
const openEditProfilePopup = function () {
  //автозаполнение значений инпутов формы
  profileNamePopupFormInput.value = profileNameElement.textContent;
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  openPopup(editProfilePopupElement);
  document.addEventListener('keydown', closePopupWithEscButton);
}

//функция закрытия попапа редактирования профиля
const closeEditProfilePopup = function () {
  closePopup(editProfilePopupElement, );
  clearFormInputs(editProfilePopupForm);
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
  openPopup(addCardPopupElement);
  document.addEventListener('keydown', closePopupWithEscButton);
}

//функция закрытия попапа добавления карточки
const closeAddCardPopup = function () {
  closePopup(addCardPopupElement);
  clearFormInputs(addCardPopupForm);
}

//функция для очищения полей инпутов в форме добавления карточки
const clearFormInputs = function (formElement) {
    formElement.reset();
};

//функция создания новой карточки и её добавления в начало галереи
const renderNewPlace = function (newPlaceItem) {
  //добавление карточки в начало галереи
  galleryListElement.prepend(newPlaceItem);
};

//функция обработки формы добавления карточки (получаем название и ссылку)
function getNewPlaceData() {
  const newPlaceTitle = cardTitlePopupFormInput.value;
  const newPlaceLink = cardLinkPopupFormInput.value;
  const newPlace = {
    name: newPlaceTitle,
    link: newPlaceLink
  }
  return newPlace;
}

//функция добавления карточки в галереию по сабмиту
function addCardPopupFormSubmitHandler (evt) {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
  const newPlaceData = getNewPlaceData();
  const newPlaceItem = createCard(newPlaceData);
  renderNewPlace(newPlaceItem);
  closeAddCardPopup();
  clearFormInputs(addCardPopupForm);
}

//функция закрытия  попапа  по клику на оверлэй
const closePopupWithClickOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }  else  {
    closePopup(event.currentTarget);
    event.currentTarget.removeEventListener('mousedown', closePopupWithClickOnOverlay);
  }
};

//функция закрытия  попапа по клику на клавишу Ecsape
const closePopupWithEscButton = (evt)  => {
  popupList.forEach(popupElement => {
    if (evt.key === 'Escape') {
      if (popupElement.classList.contains('popup_opened')) {
        closePopup(popupElement);
        document.removeEventListener('keydown', closePopupWithEscButton);
      };
    };
  });
}

//функция проверки клика по оверлэю для каждого попапа
const setClickOnOverlayEventListeners = (popupList) => {
  popupList.forEach(popupElement => {
      popupElement.addEventListener('mousedown', closePopupWithClickOnOverlay);
  });
};
//вызов  этой функции
setClickOnOverlayEventListeners(popupList);


//слушатели попапов и сабмитов форм
editProfilePopupForm.addEventListener('submit', editProfileFormSubmitHandler);
openEditProfileButton.addEventListener('click', openEditProfilePopup);
closeEditProfileButton.addEventListener('click', closeEditProfilePopup);

addCardPopupForm.addEventListener('submit', addCardPopupFormSubmitHandler);
openAddCardButton.addEventListener('click', openAddCardPopup);
closeAddCardButton.addEventListener('click', closeAddCardPopup);

closeFullImageButton.addEventListener('click', closeFullImage);
