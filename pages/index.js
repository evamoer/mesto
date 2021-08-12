import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js'
import {items, settings} from '../utils/constants.js';

const profileInfoElement = document.querySelector('.profile__info');
const profileNameElement = profileInfoElement.querySelector('.profile__name');
const profileAboutElement = profileInfoElement.querySelector('.profile__about');
const openEditProfileButton = document.querySelector('.button_type_edit');
const openAddCardButton = document.querySelector('.button_type_add');
const editProfilePopupForm = document.getElementById('popup__edit-profile-form');
const profileNamePopupFormInput = editProfilePopupForm.elements["profile-name"];
const profileAboutPopupFormInput = editProfilePopupForm.elements["profile-about"];
const addCardPopupForm = document.getElementById('popup__add-card-form');
const cardTitlePopupFormInput = addCardPopupForm.elements["card-title"];
const cardLinkPopupFormInput = addCardPopupForm.elements["card-link"];
const editProfileFormValidator = new FormValidator(settings, editProfilePopupForm);
const addCardFormValidator = new FormValidator(settings, addCardPopupForm);

function renderCard (item) {
    const card = new Card(item.name, item.link, '.gallery-item-template', '.gallery-table__item', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const gallerySection = new Section({items: items, renderer: renderCard}, '.gallery-table');

gallerySection.renderItems();

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    profileNameElement.textContent =  profileNamePopupFormInput.value;
    profileAboutElement.textContent = profileAboutPopupFormInput.value;
    editProfilePopupElement.close();
  }
})

const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const newCardData = {
      name: cardTitlePopupFormInput.value,
      link: cardLinkPopupFormInput.value
    };
    gallerySection.addItem(renderCard(newCardData));
    addCardPopupElement.close();
  }
})

function handleCardClick(evt) {
  const popupWithImage = new PopupWithImage ('.popup_type_full-image');
  popupWithImage.open(evt);
  popupWithImage.setEventListeners();
}

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

openEditProfileButton.addEventListener('click', () => {
  profileNamePopupFormInput.value = profileNameElement.textContent;
  profileAboutPopupFormInput.value = profileAboutElement.textContent;
  editProfilePopupElement.open();
  editProfileFormValidator.cleanInputError();
  editProfileFormValidator.toggleSubmitButtonState();
});

editProfilePopupElement.setEventListeners();

openAddCardButton.addEventListener('click', () => {
  addCardPopupElement.open();
  addCardPopupForm.reset();
  addCardFormValidator.cleanInputError();
  addCardFormValidator.toggleSubmitButtonState();
});

addCardPopupElement.setEventListeners();
