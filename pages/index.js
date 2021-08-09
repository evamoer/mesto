import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {items, settings} from '../utils/constants.js';

const galleryListElement = document.querySelector('.gallery-table');
const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');
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
const escapeKey = 'Escape';
const editProfileFormValidator = new FormValidator(settings, editProfilePopupForm);
const addCardFormValidator = new FormValidator(settings, addCardPopupForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function renderCard (item) {
    const card = new Card(item.name, item.link, '.gallery-item-template', '.gallery-table__item', openFullImage);
    const cardElement = card.generateCard();
    return cardElement;
};

items.forEach((item) => {
    galleryListElement.append(renderCard (item));
});

function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEscKey);
    popupElement.addEventListener('mousedown', closePopupWithClickOnOverlay);
};

function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEscKey);
    popupElement.removeEventListener('mousedown', closePopupWithClickOnOverlay);
};

function closePopupWithEscKey (evt) {
  const activePopupElement = document.querySelector('.popup_opened');
    if (evt.key === escapeKey) {
      closePopup(activePopupElement);
    };
};

function closePopupWithClickOnOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

function openEditProfilePopup () {
  profileNamePopupFormInput.value = profileNameElement.textContent;
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  openPopup(editProfilePopupElement);
  editProfileFormValidator.cleanInputError();
  editProfileFormValidator.toggleSubmitButtonState();
};

function editProfileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileNameElement.textContent =  profileNamePopupFormInput.value;
  profileAboutElement.textContent = profileAboutPopupFormInput.value;
  closePopup(editProfilePopupElement);
};

function openAddCardPopup () {
  openPopup(addCardPopupElement);
  addCardPopupForm.reset();
  addCardFormValidator.cleanInputError();
  addCardFormValidator.toggleSubmitButtonState();
};

function addNewCard (newPlaceItem) {
  galleryListElement.prepend(newPlaceItem);
};

function addCardPopupFormSubmitHandler (evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardTitlePopupFormInput.value,
    link: cardLinkPopupFormInput.value
  };
  addNewCard(renderCard(newCardData));
  closePopup(addCardPopupElement);
};

function closeFullImage () {
  closePopup(fullImagePopupElement);
};

function openFullImage (evt) {
  openPopup(fullImagePopupElement);
  fullImageElement.src = evt.target.src;
  fullImageElement.alt = evt.target.alt;
  fullImageCaption.textContent = evt.target.alt;
};

editProfilePopupForm.addEventListener('submit', editProfileFormSubmitHandler);
openEditProfileButton.addEventListener('click', openEditProfilePopup);
closeEditProfileButton.addEventListener('click', () => closePopup(editProfilePopupElement));
addCardPopupForm.addEventListener('submit', addCardPopupFormSubmitHandler);
openAddCardButton.addEventListener('click', openAddCardPopup);
closeAddCardButton.addEventListener('click', () => closePopup(addCardPopupElement));
closeFullImageButton.addEventListener('click', closeFullImage);
