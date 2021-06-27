//переменная для попап-секции
const popupElement = document.querySelector('.popup');
//переменная для попап-контейнера (общая)
const popupContainer = popupElement.querySelector('.popup__container');
//переменные для попап-контейнеров: редактирования профиля и добавления карточки
const editProfilePopupElement = popupElement.querySelector('.popup__container_type_edit-profile');
const addCardPopupElement = popupElement.querySelector('.popup__container_type_add-card');
// переменные для кнопок вызова/закрытия попапов и сабмитов у каждого попапа
const editProfilePopupOpenButtonElement = document.querySelector('.button_type_edit');
const addCardPopupOpenButtonElement = document.querySelector('.button_type_add');
const editProfileCloseButtonElement = editProfilePopupElement.querySelector('.button_type_close');
const addCardCloseButtonElement = addCardPopupElement.querySelector('.button_type_close');
const popupSubmitButtonElement = popupContainer.querySelector('.button_type_submit');
// переменная формы попапа и инпутов каждого попапа
const popupFormElement = popupElement.querySelector('.popup__form');
const profileNamePopupFormInput = popupFormElement.querySelector('.popup__input_type_profile-name');
const profileAboutPopupFormInput = popupFormElement.querySelector('.popup__input_type_profile-about');
const cardTitlePopupFormInput = addCardPopupElement.querySelector('.popup__input_type_card-title');
const cardLinkPopupFormInput  = addCardPopupElement.querySelector('.popup__input_type_card-link');
// переменные элементов из секции профиля, которые должны измениться после редактирования
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');


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
//переменные для темплейта галереи и списка галереи
const galleryTemplateContent = document.querySelector('.gallery-item-template').content;
const galleryListElement = document.querySelector('.gallery-table');

//вызов функции для обработки и вывода массива с карточками
renderItems(items);

//функция для обработки массива с карточками
function renderItems(items) {
  items.forEach(renderItem);
};

//функция для создания и наполнения одной карточки
function renderItem(item) {
  const galleryItemElement = galleryTemplateContent.cloneNode(true);
  const galleryItemElementText = galleryItemElement.querySelector('.card__title');
  const galleryItemImage = galleryItemElement.querySelector('.card__image');
  galleryItemImage.src = item.link;
  galleryItemImage.alt = item.name;
  galleryItemElementText.textContent = item.name;
  //слушатель клика по кнопке лайка и функция лайка-анлайка карточки
  galleryItemElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like-active');
  })
  //вывод карточки в галерею
  galleryListElement.append(galleryItemElement);
};




//функция для открытия по клику попапа для редактирования профиля
const openEditProfilePopup = function() {
  profileNamePopupFormInput.value = profileNameElement.textContent;
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
  editProfilePopupElement.classList.add('popup__container_opened');
};


//функция для открытия по клику попапа для добавления карточки
const openAddCardPopup = function() {
  popupElement.classList.add('popup_opened');
  addCardPopupElement.classList.add('popup__container_opened');
};


//функция для закрытия попапа редактирования профиля по клику на крестик
const editProfileClosePopup = function() {
  editProfilePopupElement.classList.remove('popup__container_opened');
  popupElement.classList.remove('popup_opened');
};

//функция для закрытия попапа добавления карточки по клику на крестик
const addCardClosePopup = function() {
  addCardPopupElement.classList.remove('popup__container_opened');
  popupElement.classList.remove('popup_opened');
};

//функция добавления новой карточки
function addCardFormSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    //создаем новый темплейт, заполняем его данными, полученными из формы
    const galleryItemElement = galleryTemplateContent.cloneNode(true);
    let galleryItemElementText = galleryItemElement.querySelector('.card__title');
    let galleryItemImage = galleryItemElement.querySelector('.card__image');
    galleryItemElementText.textContent = cardTitlePopupFormInput.value;
    galleryItemImage.src = cardLinkPopupFormInput.value;
    galleryItemImage.alt = cardTitlePopupFormInput.value;
    //слушатель клика по кнопке лайка и функция лайка-анлайка карточки
    galleryItemElement.querySelector('.button_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('button_type_like-active');
  })
  //вывод карточки в начало галереи
    galleryListElement.prepend(galleryItemElement);
    addCardClosePopup(); //попап закрывается при сохранении формы
}

//функция сохранения изменений в профиле
function editProdileFormSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileNameElement.textContent = profileNamePopupFormInput.value;
    profileAboutElement.textContent = profileAboutPopupFormInput.value;
    editProfileClosePopup(); //попап закрывается при сохранении формы
}


//слушатель сабмита для редактирования профиля
editProfilePopupElement.addEventListener('submit', editProdileFormSubmitHandler);
//слушатель сабмита для добавления карточки
addCardPopupElement.addEventListener('submit', addCardFormSubmitHandler);
//открытие попапа редактирования профиля по клику
editProfilePopupOpenButtonElement.addEventListener('click', openEditProfilePopup);
//открытие попапа для добавления карточки по клику
addCardPopupOpenButtonElement.addEventListener('click', openAddCardPopup);
//закрытие попапа редактирования профиля по клику на крестик
editProfileCloseButtonElement.addEventListener('click', editProfileClosePopup);
//закрытие попапа добавления карточки по клику на крестик
addCardCloseButtonElement.addEventListener('click', addCardClosePopup);
