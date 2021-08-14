import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {items, settings} from '../utils/constants.js';

const openEditProfileButton = document.querySelector('.button_type_edit');
const openAddCardButton = document.querySelector('.button_type_add');
const editProfilePopupForm = document.getElementById('popup__edit-profile-form');
const addCardPopupForm = document.getElementById('popup__add-card-form');
const cardTitlePopupFormInput = addCardPopupForm.elements["card-title"];
const cardLinkPopupFormInput = addCardPopupForm.elements["card-link"];
const editProfileFormValidator = new FormValidator(settings, editProfilePopupForm);
const addCardFormValidator = new FormValidator(settings, addCardPopupForm);
const userInfoElement = new UserInfo ('.profile__name', '.profile__about', 'profile-name', 'profile-about');

function handleCardClick(evt) {
  const popupWithImage = new PopupWithImage ('.popup_type_full-image');
  popupWithImage.open(evt);
  popupWithImage.setEventListeners();
}

function renderCard (item) {
    const card = new Card(item.name, item.link, '.gallery-item-template', '.gallery-table__item', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const gallerySection = new Section({items: items, renderer: renderCard}, '.gallery-table');
gallerySection.renderItems();

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    userInfoElement.setUserInfo(inputValuesData);
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

openEditProfileButton.addEventListener('click', () => {
  editProfilePopupElement.setInputValues(userInfoElement.getUserInfo());
  editProfilePopupElement.open();
  editProfileFormValidator.cleanInputError();
  editProfileFormValidator.toggleSubmitButtonState();
});

openAddCardButton.addEventListener('click', () => {
  addCardPopupForm.reset();
  ddCardPopupElement.open();
  addCardFormValidator.cleanInputError();
  addCardFormValidator.toggleSubmitButtonState();
});

addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
