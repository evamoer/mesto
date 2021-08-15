import './index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {items, validatorSettings, profileSettings, cardSettings} from '../utils/constants.js';

const openEditProfileButton = document.querySelector('.button_type_edit');
const openAddCardButton = document.querySelector('.button_type_add');
const editProfilePopupForm = document.getElementById('popup__edit-profile-form');
const profileNameInputElement = editProfilePopupForm.elements['profile-name']
const profileAboutInputElement = editProfilePopupForm.elements['profile-about']
const addCardPopupForm = document.getElementById('popup__add-card-form');
const cardTitleInputElement = addCardPopupForm.elements["card-title"];
const cardLinkInputElement = addCardPopupForm.elements["card-link"];
const editProfileFormValidator = new FormValidator(validatorSettings, editProfilePopupForm);
const addCardFormValidator = new FormValidator(validatorSettings, addCardPopupForm);
const userInfoElement = new UserInfo (profileSettings);

function handleCardClick(evt) {
  const popupWithImage = new PopupWithImage ('.popup_type_full-image');
  popupWithImage.open(evt);
  popupWithImage.setEventListeners();
}

function renderCard (item) {
    const card = new Card(item, cardSettings, handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
};

const gallerySection = new Section({items: items, renderer: renderCard}, '.gallery-table');
gallerySection.renderItems();

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: editProfileFormValidator,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    userInfoElement.setUserInfo(inputValuesData);
    editProfilePopupElement.close();
  }
})

const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formValidator: addCardFormValidator,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const newCardData = {
      title: cardTitleInputElement.value,
      link: cardLinkInputElement.value
    };
    gallerySection.addItem(renderCard(newCardData));
    addCardPopupElement.close();
  }
})

openEditProfileButton.addEventListener('click', () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  profileNameInputElement.value = editProfileFormInputValues['profile-name'];
  profileAboutInputElement.value = editProfileFormInputValues['profile-about'];
  editProfilePopupElement.open();
});

openAddCardButton.addEventListener('click', addCardPopupElement.open.bind(addCardPopupElement));

addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
