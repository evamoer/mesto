import Card from './Card.js';
import {items} from './initial-items.js';

const galleryListElement = document.querySelector('.gallery-table');

//переменные элементов из секции профиля, которые должны измениться после редактирования
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

const popupElement = document.querySelector('.popup');
const popupList = Array.from(document.querySelectorAll('.popup'));
//переменные для попапа редактирования профиля
const editProfilePopupElement = document.querySelector('.popup_type_edit-profile');
const editProfilePopupForm = editProfilePopupElement.querySelector('.popup__form');
const profileNamePopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-name');
const profileAboutPopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-about');
const openEditProfileButton = document.querySelector('.button_type_edit');
const closeEditProfileButton = editProfilePopupElement.querySelector('.button_type_close');

//переменные для попапа добавления карточки
const addCardPopupElement = document.querySelector('.popup_type_add-card');
const addCardPopupForm = addCardPopupElement.querySelector('.popup__form');
const cardTitlePopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-title');
const cardLinkPopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-link');
const openAddCardButton = document.querySelector('.button_type_add');
const closeAddCardButton = addCardPopupElement.querySelector('.button_type_close');

//переменные для попапа полного изображения
const fullImagePopupElement = document.querySelector('.popup_type_full-image');
const fullImagePopupContainer = fullImagePopupElement.querySelector('.popup__container_type_full-image');
const fullImageElement = fullImagePopupContainer.querySelector('.popup__full-image');
const fullImageCaption = fullImagePopupContainer.querySelector('.popup__full-image-caption');
const closeFullImageButton = fullImagePopupContainer.querySelector('.button_type_close');

function renderCard (item) {
    const card = new Card(item.name, item.link, '.gallery-item-template');
    const cardElement = card.generateCard();
    return cardElement;
}

items.forEach((item) => {
    galleryListElement.append(renderCard (item));
})


//функция открытия попапа
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEscButton);
  };

//функция закрытия попапа
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEscButton);
  }

//функция закрытия  попапа по клику на клавишу Ecsape
const closePopupWithEscButton = (evt)  => {
    const activePopupElement = document.querySelector('.popup_opened');
      if (evt.key === 'Escape') {
        closePopup(activePopupElement);
        };
    };


//функция открытия попапа редактирования профиля
const openEditProfilePopup = function () {
    //автозаполнение значений инпутов формы
    profileNamePopupFormInput.value = profileNameElement.textContent;
    profileAboutPopupFormInput.value = profileAboutElement.textContent;
    openPopup(editProfilePopupElement);
  }

//функция сохранения изменений в профиле по сабмиту
function editProfileFormSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileNameElement.textContent =  profileNamePopupFormInput.value;
    profileAboutElement.textContent = profileAboutPopupFormInput.value;
    closePopup(editProfilePopupElement); //попап закрывается при сохранении формы
};

//функция создания новой карточки и её добавления в начало галереи
const addNewCard = function (newPlaceItem) {
    //добавление карточки в начало галереи
    galleryListElement.prepend(newPlaceItem);
  };

//функция добавления карточки в галереию по сабмиту
function addCardPopupFormSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    const newCardData = {
      name: cardTitlePopupFormInput.value,
      link: cardLinkPopupFormInput.value
    };
    addNewCard(renderCard(newCardData));
    closeAddCardPopup();
    addCardPopupForm.reset();
  }

//функция закрытия попапа добавления карточки
const closeAddCardPopup = function () {
    closePopup(addCardPopupElement);
    addCardPopupForm.reset();
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
  }


  //функция закрытия  попапа  по клику на оверлэй
const closePopupWithClickOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  };


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
closeEditProfileButton.addEventListener('click', () => closePopup(editProfilePopupElement));

addCardPopupForm.addEventListener('submit', addCardPopupFormSubmitHandler);
openAddCardButton.addEventListener('click', () => openPopup(addCardPopupElement));
closeAddCardButton.addEventListener('click', closeAddCardPopup);

closeFullImageButton.addEventListener('click', closeFullImage);

export {openFullImage};
