import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validatorSettings, profileSettings, cardSettings} from '../utils/constants.js';

const buttonForOpenProfileInfo = document.querySelector('.button_type_edit');
const buttonForOpenAddCard = document.querySelector('.button_type_add');
const popupEditProfileForm = document.getElementById('popup__edit-profile-form');
const profileNameInputElement = popupEditProfileForm.elements['profile-name']
const profileAboutInputElement = popupEditProfileForm.elements['profile-about']
const popupAddCardForm = document.getElementById('popup__add-card-form');
const popupDeleteCardForm = document.getElementById('popup__delete-card-form');
const validatorForEditProfileForm = new FormValidator(validatorSettings, popupEditProfileForm);
const validatorForAddCardForm = new FormValidator(validatorSettings, popupAddCardForm);
const validatorForDeleteCardForm = new FormValidator(validatorSettings, popupDeleteCardForm);
const userInfoElement = new UserInfo (profileSettings);
const popupWithImage = new PopupWithImage ('.popup_type_full-image');

const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_type_delete-card',
  formValidator: validatorForDeleteCardForm,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
  }
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '8db06075-d4ea-471e-8c36-db2b91e349e8',
    'Content-Type': 'application/json'
  }
});

const handleCardClick = ((evt) => {
  popupWithImage.open(evt);
});

const handleDeleteClick = ((cardId) => {
  return new Promise ((resolve, reject) => {
    popupDeleteCard.open();
    popupDeleteCardForm.onsubmit = () => {
      api.deleteCard(cardId);
      resolve();
    }
  });
});

const renderCard = ((item) => {
  const card = new Card(item, cardSettings, handleCardClick, handleDeleteClick);
  const cardElement = card.generateCard();
  return cardElement;
});


console.log(api.getInitialCards());

const gallerySection = new Section({items: api.getInitialCards(), renderer: renderCard}, '.gallery-table');

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: validatorForEditProfileForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    api.updateUserProfileData(inputValuesData)
    .then((userData) => {
      userInfoElement.setUserInfo(userData);
    })
  }
});

const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formValidator: validatorForAddCardForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    api.addCard(inputValuesData)
    .then((data) => {
      const newCard = renderCard(data);
      gallerySection.addItem(newCard);
    })
  }
});


const handleButtonForOpenProfileInfo = () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  profileNameInputElement.value = editProfileFormInputValues['profileName'];
  profileAboutInputElement.value = editProfileFormInputValues['profileAbout'];
  editProfilePopupElement.open();
};

gallerySection.renderItems();

api.getUserProfileData().then(data => {
  userInfoElement.setUserInfo(data);
});

buttonForOpenProfileInfo.addEventListener('click', handleButtonForOpenProfileInfo);
buttonForOpenAddCard.addEventListener('click', addCardPopupElement.open.bind(addCardPopupElement));
addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
validatorForEditProfileForm.enableValidation();
validatorForAddCardForm.enableValidation();


