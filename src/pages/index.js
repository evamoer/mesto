import './index.css'

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {items, validatorSettings, profileSettings, cardSettings} from '../utils/constants.js';

const buttonForOpenProfileInfo = document.querySelector('.button_type_edit');
const buttonForOpenAddCard = document.querySelector('.button_type_add');
const popupEditProfileForm = document.getElementById('popup__edit-profile-form');
const profileNameInputElement = popupEditProfileForm.elements['profile-name']
const profileAboutInputElement = popupEditProfileForm.elements['profile-about']
const popupAddCardForm = document.getElementById('popup__add-card-form');
const cardTitleInputElement = popupAddCardForm.elements["card-title"];
const cardLinkInputElement = popupAddCardForm.elements["card-link"];
const validatorForEditProfileForm = new FormValidator(validatorSettings, popupEditProfileForm);
const validatorForAddCardForm = new FormValidator(validatorSettings, popupAddCardForm);
const userInfoElement = new UserInfo (profileSettings);
const popupWithImage = new PopupWithImage ('.popup_type_full-image');


function handleCardClick(evt) {
  popupWithImage.open(evt);
}

function renderCard (item) {
    const card = new Card(item, cardSettings, handleCardClick);
    const cardElement = card.generateCard();
    gallerySection.addItem(cardElement);
};

const gallerySection = new Section({items: items, renderer: renderCard}, '.gallery-table');
gallerySection.renderItems();

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: validatorForEditProfileForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    userInfoElement.setUserInfo(inputValuesData);
    editProfilePopupElement.close();
  }
})

const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formValidator: validatorForAddCardForm,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
    const newCardData = {
      title: cardTitleInputElement.value,
      link: cardLinkInputElement.value
    };
    renderCard(newCardData);
    addCardPopupElement.close();
  }
})

buttonForOpenProfileInfo.addEventListener('click', () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  profileNameInputElement.value = editProfileFormInputValues['profileName'];
  profileAboutInputElement.value = editProfileFormInputValues['profileAbout'];
  editProfilePopupElement.open();
});

buttonForOpenAddCard.addEventListener('click', addCardPopupElement.open.bind(addCardPopupElement));

addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
popupWithImage.setEventListeners();
validatorForEditProfileForm.enableValidation();
validatorForAddCardForm.enableValidation();

