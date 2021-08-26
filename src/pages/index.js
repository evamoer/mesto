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
const buttonForOpenAvatarEdit = document.querySelector('.profile__avatar-container');
const popupEditProfileForm = document.getElementById('popup__edit-profile-form');
const profileNameInputElement = popupEditProfileForm.elements['profile-name']
const profileAboutInputElement = popupEditProfileForm.elements['profile-about']
const popupAddCardForm = document.getElementById('popup__add-card-form');
const popupDeleteCardForm = document.getElementById('popup__delete-card-form');
const popupEditAvatarForm = document.getElementById('popup__edit-avatar-form');
const validatorForEditProfileForm = new FormValidator(validatorSettings, popupEditProfileForm);
const validatorForAddCardForm = new FormValidator(validatorSettings, popupAddCardForm);
const validatorForDeleteCardForm = new FormValidator(validatorSettings, popupDeleteCardForm);
const validatorForEditAvatarForm = new FormValidator(validatorSettings, popupEditAvatarForm);
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
      api.deleteCard(cardId)
      .then(() => resolve());
    }
  });
});

const handleLikeClick = ((data) => {
  const status = data.event.target.classList.contains('button_type_like-active');
  data.event.target.classList.toggle('button_type_like-active');
  return new Promise((resolve, reject) => {
    if (status) {
      api.unlikeCard(data.id)
      .then(likeData => resolve(likeData));
    } else {
      api.likeCard(data.id)
      .then(likeData => resolve(likeData));
    }
  })
});

const renderCard = ((item) => {
  const card = new Card(item, cardSettings, handleCardClick, handleDeleteClick, handleLikeClick);
  const cardElement = card.generateCard();
  return cardElement;
});

const gallerySection = new Section({items: api.getInitialCards(), renderer: renderCard}, '.gallery-table');

const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: validatorForEditProfileForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editProfilePopupElement.renderLoading(true);
    api.updateUserProfileData(inputValuesData)
    .then((userData) => {
      userInfoElement.setUserInfo(userData);
    })
    .finally(() => editProfilePopupElement.renderLoading(false))
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

const editAvatarPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  formValidator: validatorForEditAvatarForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editAvatarPopupElement.renderLoading(true);
    api.changeAvatar(inputValuesData)
    .then((data) => {
      document.querySelector('.profile__avatar').src = data.avatar;
    })
    .finally(() => editAvatarPopupElement.renderLoading(false))
  }
})


const handleButtonForOpenProfileInfo = () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  profileNameInputElement.value = editProfileFormInputValues['profileName'];
  profileAboutInputElement.value = editProfileFormInputValues['profileAbout'];
  editProfilePopupElement.open();
};

gallerySection.renderItems();

api.getUserProfileData().then(data => {
  userInfoElement.setUserInfo(data);
  document.querySelector('.profile__avatar').src = data.avatar;
});

buttonForOpenProfileInfo.addEventListener('click', handleButtonForOpenProfileInfo);
buttonForOpenAddCard.addEventListener('click', addCardPopupElement.open.bind(addCardPopupElement));
buttonForOpenAvatarEdit.addEventListener('click', editAvatarPopupElement.open.bind(editAvatarPopupElement));
addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
editAvatarPopupElement.setEventListeners();
validatorForEditProfileForm.enableValidation();
validatorForAddCardForm.enableValidation();
validatorForEditAvatarForm.enableValidation();


