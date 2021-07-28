import {settings} from './validation-settings.js';
import {items} from './initial-items.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';


const galleryListElement = document.querySelector('.gallery-table');
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');

const popupList = Array.from(document.querySelectorAll('.popup'));
const formList = Array.from(document.querySelectorAll(settings.formSelector));

const editProfilePopupElement = document.querySelector('.popup_type_edit-profile');
const editProfilePopupForm = editProfilePopupElement.querySelector('.popup__form');
const profileNamePopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-name');
const profileAboutPopupFormInput = editProfilePopupElement.querySelector('.popup__input_type_profile-about');
const openEditProfileButton = document.querySelector('.button_type_edit');
const closeEditProfileButton = editProfilePopupElement.querySelector('.button_type_close');

const addCardPopupElement = document.querySelector('.popup_type_add-card');
const addCardPopupForm = addCardPopupElement.querySelector('.popup__form');
const cardTitlePopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-title');
const cardLinkPopupFormInput = addCardPopupForm.querySelector('.popup__input_type_card-link');
const openAddCardButton = document.querySelector('.button_type_add');
const closeAddCardButton = addCardPopupElement.querySelector('.button_type_close');

const fullImagePopupElement = document.querySelector('.popup_type_full-image');
const fullImagePopupContainer = fullImagePopupElement.querySelector('.popup__container_type_full-image');
const fullImageElement = fullImagePopupContainer.querySelector('.popup__full-image');
const fullImageCaption = fullImagePopupContainer.querySelector('.popup__full-image-caption');
const closeFullImageButton = fullImagePopupContainer.querySelector('.button_type_close');


function renderCard (item) {
    const card = new Card(item.name, item.link, '.gallery-item-template');
    const cardElement = card.generateCard();
    return cardElement;
};

items.forEach((item) => {
    galleryListElement.append(renderCard (item));
});

function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEscButton);
};

function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEscButton);
};

function closePopupWithEscButton (evt) {
  const activePopupElement = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      closePopup(activePopupElement);
    };
};

function closePopupWithClickOnOverlay (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    };
};

function setClickOnOverlayEventListeners (popupList) {
  popupList.forEach(popupElement => {
    popupElement.addEventListener('mousedown', closePopupWithClickOnOverlay);
  });
};

setClickOnOverlayEventListeners(popupList);

function openEditProfilePopup () {
    profileNamePopupFormInput.value = profileNameElement.textContent;
    profileAboutPopupFormInput.value = profileAboutElement.textContent;
    openPopup(editProfilePopupElement);
};

function editProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    profileNameElement.textContent =  profileNamePopupFormInput.value;
    profileAboutElement.textContent = profileAboutPopupFormInput.value;
    closePopup(editProfilePopupElement);
};

function addNewCard (newCardElement) {
    galleryListElement.prepend(newCardElement);
};

function addCardPopupFormSubmitHandler (evt) {
    evt.preventDefault();
    const newCardData = {
      name: cardTitlePopupFormInput.value,
      link: cardLinkPopupFormInput.value
    };
    addNewCard(renderCard(newCardData));
    closeAddCardPopup();
    addCardPopupForm.reset();
};

function closeAddCardPopup () {
    closePopup(addCardPopupElement);
    addCardPopupForm.reset();
};

function openFullImage (evt) {
    openPopup(fullImagePopupElement);
    fullImageElement.src = evt.target.src;
    fullImageElement.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
};

formList.forEach((formElement) => {
    const formValidator = new FormValidator (settings, formElement);
    formValidator.enableValidation();
});

editProfilePopupForm.addEventListener('submit', editProfileFormSubmitHandler);
openEditProfileButton.addEventListener('click', openEditProfilePopup);
closeEditProfileButton.addEventListener('click', () => closePopup(editProfilePopupElement));
addCardPopupForm.addEventListener('submit', addCardPopupFormSubmitHandler);
openAddCardButton.addEventListener('click', () => openPopup(addCardPopupElement));
closeAddCardButton.addEventListener('click', closeAddCardPopup);
closeFullImageButton.addEventListener('click', () => closePopup(fullImagePopupElement));

export {openFullImage};
