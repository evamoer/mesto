import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validatorSettings, profileSettings, cardSettings} from '../utils/constants.js';

const buttonOpenProfile = document.querySelector('.button_type_edit');
const buttonOpenAddCard = document.querySelector('.button_type_add');
const buttonOpenAvatar = document.querySelector('.profile__avatar-container');
const userProfileAvatar = document.querySelector('.profile__avatar');
const popupEditProfileForm = document.getElementById('popup__edit-profile-form');
const profileNameInputElement = popupEditProfileForm.elements['profile-name']
const profileAboutInputElement = popupEditProfileForm.elements['profile-about']
const popupEditAvatarForm = document.getElementById('popup__edit-avatar-form');
const popupAddCardForm = document.getElementById('popup__add-card-form');
const popupDeleteCardForm = document.getElementById('popup__delete-card-form');
//экземпляры валидаторов для всех форм
const validatorProfileForm = new FormValidator(validatorSettings, popupEditProfileForm);
const validatorAddCardForm = new FormValidator(validatorSettings, popupAddCardForm);
const validatorDeleteCardForm = new FormValidator(validatorSettings, popupDeleteCardForm);
const validatorAvatarForm = new FormValidator(validatorSettings, popupEditAvatarForm);

//экземпляр для попапа с полным изображением карточки
const popupWithImage = new PopupWithImage ('.popup_type_full-image');

//экземпляр для информации профиля
const userInfoElement = new UserInfo (profileSettings);

//экземпляр для апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '8db06075-d4ea-471e-8c36-db2b91e349e8',
    'Content-Type': 'application/json'
  }
});

//обработчик нажатия на карточку для полного изображения
const handleFullImage = ((imageData) => {
  popupWithImage.open(imageData);
});

//обработчик нажатия на кнопку удаления карточки
const handleDeleteCard = ((id) => {
  popupDeleteCard.open();
  return new Promise((resolve, reject) => {
    popupDeleteCardForm.onsubmit = () => {
      resolve(api.deleteCard(id))
    }
  });
});

//получаем данные о пользователе: профиль и аватар
api.getUserData()
  .then((userData) => {
    userInfoElement.setUserInfo(userData);
    userProfileAvatar.src = userData.avatar;
  })
  .catch(err => console.log(`Ошибка: ${err}`));

//генерация и возврат одной карточки
const renderCard = ((item, userData) => {
  const card = new Card(item, userData, api, cardSettings, handleFullImage, handleDeleteCard);
  return card.generateCard();
});

//создание галереи и получение всех карточек с сервера
const gallerySection = new Section(api, {containerSelector: '.gallery-table', renderer: renderCard});
gallerySection.renderItems();

//экземпляр для попапа редактирования информации в профиле
const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: validatorProfileForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editProfilePopupElement.renderLoading(true);
    api.updateUserData(inputValuesData)
      .then((userData) => {
        userInfoElement.setUserInfo(userData);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => editProfilePopupElement.renderLoading(false))
  }
});

//экземпляр для попапа добавления карточки в галерею
const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formValidator: validatorAddCardForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    gallerySection.addItem(inputValuesData);
  }
});

//экземпляр для попапа редактирования аватара в профиле
const editAvatarPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  formValidator: validatorAvatarForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editAvatarPopupElement.renderLoading(true);
    api.updateAvatar(inputValuesData)
      .then((data) => {
        document.querySelector('.profile__avatar').src = data.avatar;
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => editAvatarPopupElement.renderLoading(false))
  }
})

//экземпляр для попапа удаления карточки
const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_type_delete-card',
  formValidator: validatorDeleteCardForm,
  handleFormSubmit: (evt) => {
    evt.preventDefault();
  }
});

//обработчик нажатия кнопки открытия формы редактирования профиля
const handleButtonForOpenProfileInfo = () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  profileNameInputElement.value = editProfileFormInputValues.username;
  profileAboutInputElement.value = editProfileFormInputValues.about;
  editProfilePopupElement.open();
};

//все слушатели + включение валидации для форм
buttonOpenProfile.addEventListener('click', handleButtonForOpenProfileInfo);
buttonOpenAddCard.addEventListener('click', addCardPopupElement.open.bind(addCardPopupElement));
buttonOpenAvatar.addEventListener('click', editAvatarPopupElement.open.bind(editAvatarPopupElement));
addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
editAvatarPopupElement.setEventListeners();
validatorProfileForm.enableValidation();
validatorAddCardForm.enableValidation();
validatorAvatarForm.enableValidation();


