//переменная для попап-секции
const popupElement = document.querySelector('.popup');
//переменная для кнопки открытия попапа редактирования профиля
const editProfilePopupOpenButtonElement = document.querySelector('.button_type_edit');
//переменная для кнопки открытия попапа добавления карточки
const addCardPopupOpenButtonElement = document.querySelector('.button_type_add');
// переменные элементов из секции профиля, которые должны измениться после редактирования
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');
//переменная для галереи карточек
const galleryListElement = document.querySelector('.gallery-table');
//переменные для темплейта элемента галереи
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

//переменная для темплейта попапа открытия полного изображения
const openFullimageTemplateContent = document.querySelector('.popup__full-image-template').content;
//функция открытия попапа с полным изображением
const openFullImage = function(evt) {
  const openCardImagePopupElement = openFullimageTemplateContent.cloneNode(true); //клонируем в DOM попап полного изображения
  checkPopupElement(); //проверяем, есть ли в DOM попапы, убираем, если есть
  popupElement.append(openCardImagePopupElement); //добавляем попап в DOM
  const openedFullImageFigure =  popupElement.querySelector('.popup__container_type_full-image')
  const openedFullImage = popupElement.querySelector('.popup__full-image');
  const openedFullImageCaption = popupElement.querySelector('.popup__full-image-caption');
  popupElement.classList.add('popup_type_full-image'); //для более затемненного оверлэя при открытии полного изображения
  openedFullImage.src = evt.target.src;
  openedFullImage.alt = evt.target.alt;
  openedFullImageCaption.textContent = evt.target.alt;
  popupElement.classList.add('popup_opened');
  openedFullImageFigure.classList.add('popup__container_opened');
  //отслеживаем клик по кнопке закрытия
  const closeFullImageButton = popupElement.querySelector('.button_type_close');
  closeFullImageButton.addEventListener('click', closeFullImage);
};

//функция закрытия попапа с полным изображением
const closeFullImage  = function() {
  popupElement.classList.remove('popup_type_full-image');
  popupElement.querySelector('.popup__container_type_full-image').classList.remove('popup__container_opened');
  popupElement.classList.remove('popup_opened');
};

renderItems(items); //вызов функции для обработки и вывода массива с карточками

function renderItems(items) { //функция для обработки каждого элемента из массива с карточками
  items.forEach(renderItem);
};

function clickOnLikeButton(evt) { //функция работы кнопки лайка по клику
  evt.target.classList.toggle('button_type_like-active');
};

function clickOnDeleteButton(evt) { //функция удаления карточки по клику на корзину
  const cardItem = evt.target.closest('.gallery-table__item');
  cardItem.remove();
};

//функция для создания и наполнения одной карточки
function renderItem(item) {
  const galleryItemElement = galleryTemplateContent.cloneNode(true); //клонируем в DOM элемент карточки
  const cardImageContainerElement = galleryItemElement.querySelector('.card__image-container');
  const galleryItemImage = galleryItemElement.querySelector('.card__image');
  const galleryItemElementTitle = galleryItemElement.querySelector('.card__title');
  const likeButtonElement = galleryItemElement.querySelector('.button_type_like');
  const deleteCardButton = galleryItemElement.querySelector('.button_type_delete-card');
  galleryItemImage.src = item.link;
  galleryItemImage.alt = item.name;
  galleryItemElementTitle.textContent = item.name;
  //вывод готовой карточки в галерею
  galleryListElement.append(galleryItemElement);
  //отслеживаем клик по кнопке лайка
  likeButtonElement.addEventListener('click', clickOnLikeButton);
  //отслеживаем клик по кнопке корзины
  deleteCardButton.addEventListener('click', clickOnDeleteButton);
  //отслеживаем клик на контейнер изображения для открытия полного изображения
  cardImageContainerElement.addEventListener('click', openFullImage);
};

//функция проверки открытых попапов
const checkPopupElement = function() {
    while (popupElement.firstChild) {//если есть открытые попапы, то их нужно удалить,
    popupElement.removeChild(popupElement.lastChild);  //чтобы в DOM всегда был открыт только один попап
  }
};

//переменная для темплейта попапа редактирования профиля
const editProfilePopupTemplateContent = document.querySelector('.popup__edit-profile-template').content;
//функция создания попапа редактирования профиля
const renderEditProfilePopup = function() {
  const editProfilePopupElement = editProfilePopupTemplateContent.cloneNode(true); //клонируем в DOM попап редактирования профиля
  checkPopupElement(); //проверяем, есть ли в DOM попапы, убираем, если есть
  popupElement.append(editProfilePopupElement); //добавляем в DOM попапа редактирования профиля
  openEditProfilePopup(); //открываем попап
  //отслеживаем клик по кнопке закрытия
  const closeEditProfilePopupButton = popupElement.querySelector('.button_type_close');
  closeEditProfilePopupButton.addEventListener('click', closeEditProfilePopup);
  //отслеживаем клик по кнопке сохранить
  const submitEditProfileForm = popupElement.querySelector('.popup__form');
  submitEditProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
};

//функция для открытия попапа для редактирования профиля
const openEditProfilePopup = function() {
  const editProfilePopupElement = popupElement.querySelector('.popup__container_type_edit-profile')
  const profileNamePopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-name');
  const profileAboutPopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-about');
  profileNamePopupFormInput.value = profileNameElement.textContent; //автозаполнение значений инпутов формы
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
  editProfilePopupElement.classList.add('popup__container_opened');
};

//функция закрытия попапа редактирования профиля по клику на крестик
const closeEditProfilePopup = function() {
  popupElement.querySelector('.popup__container_type_edit-profile').classList.remove('popup__container_opened');
  popupElement.classList.remove('popup_opened');
};

//функция сохранения изменений в профиле
const editProfileFormSubmitHandler = function (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileNameElement.textContent =  popupElement.querySelector('.popup__input_type_profile-name').value;
    profileAboutElement.textContent = popupElement.querySelector('.popup__input_type_profile-about').value;
    closeEditProfilePopup(); //попап закрывается при сохранении формы
};

//переменная для темплейта попапа добавления карточки
const addCardPopupTemplateContent = popupElement.querySelector('.popup__add-card-template').content;
//функция создания попапа джобавления карточки
const renderAddCardPopup = function() {
  const addCardPopupElement = addCardPopupTemplateContent.cloneNode(true); //генерируем в DOM попап добавления карточки
  checkPopupElement(); //проверяем, есть ли в DOM попапы, убираем, если есть
  popupElement.append(addCardPopupElement); //добавляем в DOM попап добавления карточки
  openAddCardPopup(); //открываем попап добавления карточки
  //отслеживаем клик по кнопке закрытия
  const closeAddCardPopupButton = popupElement.querySelector('.button_type_close');
  closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);
  //отслеживаем клик по кнопке создать
  const submitAddCardForm = popupElement.querySelector('.popup__form');
  submitAddCardForm.addEventListener('submit', addCardFormSubmitHandler);
};

//функция для открытия попапа для добавления карточки
const openAddCardPopup = function() {
  const addCardPopupElement = popupElement.querySelector('.popup__container_type_add-card');
  popupElement.classList.add('popup_opened');
  addCardPopupElement.classList.add('popup__container_opened');
};

//функция для закрытия попапа для добавления карточки
const closeAddCardPopup = function() {
  popupElement.querySelector('.popup__container_type_add-card').classList.remove('popup__container_opened');
  popupElement.classList.remove('popup_opened');
};

//функция для очищения полей инпутов в форме добавления карточки
const clearAddCardFormInputs = function() {
    popupElement.querySelector('.popup__input_type_card-title').value = '';
    popupElement.querySelector('.popup__input_type_card-link').value = '';
};

//функция создания новой карточки и её добавления в галерею
const renderNewPlace = function() {
  const galleryItemElement = galleryTemplateContent.cloneNode(true); //клонируем в DOM
  let galleryItemElementText = galleryItemElement.querySelector('.card__title');
  let galleryItemImage = galleryItemElement.querySelector('.card__image');
  let cardTitlePopupFormInput = popupElement.querySelector('.popup__input_type_card-title');
  let cardLinkPopupFormInput = popupElement.querySelector('.popup__input_type_card-link');
  galleryItemElementText.textContent = cardTitlePopupFormInput.value;
  galleryItemImage.src = cardLinkPopupFormInput.value;
  galleryItemImage.alt = cardTitlePopupFormInput.value;
  //добавление карточки в начало галереи
  galleryListElement.prepend(galleryItemElement);
};

//функция добавления новой карточки в начало галереи
function addCardFormSubmitHandler (evt) {
  evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
  //создаем новый темплейт, заполняем его данными, полученными из формы
  renderNewPlace();
  //отслеживаем клик по кнопке лайка и функция лайка-анлайка карточки
  const likeButtonElement = galleryListElement.querySelector('.button_type_like');
  likeButtonElement.addEventListener('click', clickOnLikeButton);
  //слушатель клика по кнопке корзины и функция удаления карточки
  const deleteCardButton = galleryListElement.querySelector('.button_type_delete-card');
  deleteCardButton.addEventListener('click', clickOnDeleteButton);
  //слушатель открытия полного изображения по клику на карточку
  const cardImageContainerElement = galleryListElement.querySelector('.card__image-container');
  cardImageContainerElement.addEventListener('click', openFullImage);
  //слушатель закрытия попапа с полным изображением
  const closeFullImageButton = popupElement.querySelector('.button_type_close');
  closeFullImageButton.addEventListener('click', closeFullImage);
  clearAddCardFormInputs(); //очищаем поля инпутов
  closeAddCardPopup(); //попап закрывается при сохранении формы
};

//отслеживаем клик по кнопке открытия попапа добавления карточки
addCardPopupOpenButtonElement.addEventListener('click', renderAddCardPopup);
//отслеживаем клик по кнопке открытия попапа редактирования профиля
editProfilePopupOpenButtonElement.addEventListener('click', renderEditProfilePopup);
