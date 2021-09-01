import './index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {validatorSettings, profileSettings, cardSettings} from '../utils/constants.js';

//кнопки для открытия попапов
const buttonOpenProfile = document.querySelector('.button_type_edit');
const buttonOpenAddCard = document.querySelector('.button_type_add');
const buttonOpenAvatar = document.querySelector('.profile__avatar-container');
//экземпляры валидаторов для всех форм
const validatorProfileForm = new FormValidator(validatorSettings, 'popup__edit-profile-form');
const validatorAddCardForm = new FormValidator(validatorSettings, 'popup__add-card-form');
const validatorDeleteCardForm = new FormValidator(validatorSettings, 'popup__delete-card-form');
const validatorAvatarForm = new FormValidator(validatorSettings, 'popup__edit-avatar-form');
//экземпляр для попапа с полным изображением карточки
const popupWithImage = new PopupWithImage('.popup_type_full-image');
//экземпляр для информации профиля
const userInfoElement = new UserInfo(profileSettings);
//переменная для ID пользователя
let userId;

//экземпляр для апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: '8db06075-d4ea-471e-8c36-db2b91e349e8',
    'Content-Type': 'application/json'
  }
});

//обработчик нажатия на карточку для полного изображения
const handleFullImage = (imageData => popupWithImage.open(imageData));

//обработчик нажатия на кнопку удаления карточки
const handleDeleteCard = (cardId => {
  popupDeleteCard.open();
  return new Promise((resolve, reject) => {
    const popupDeleteCardForm = document.getElementById('popup__delete-card-form');
    popupDeleteCardForm.onsubmit = () => resolve(api.deleteCard(cardId));
  });
});


//генерация и возврат одной карточки
const renderCard = (item => {
  const userIdValue = userId;
  const card = new Card(item, userIdValue, api, cardSettings, handleFullImage, handleDeleteCard);
  return card.generateCard();
});

//экземпляр секции галереи
const gallerySection = new Section(api, {containerSelector: '.gallery-table', renderer: renderCard});

//получаем все карточки с сервера и информацию о пользователе, отрисовываем
Promise.all([api.getCards(), api.getUserData()])
  .then(([items, userData]) => {
    userId = userData._id;
    gallerySection.renderItems(items, userId);
    userInfoElement.setUserInfo(userData);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

//экземпляр для попапа редактирования информации в профиле
const editProfilePopupElement = new PopupWithForm ({
  popupSelector: '.popup_type_edit-profile',
  formValidator: validatorProfileForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editProfilePopupElement.renderLoading(true);
    api.updateUserData(inputValuesData)
      .then(userData => userInfoElement.setUserInfo(userData))
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => editProfilePopupElement.renderLoading(false));
  },
  submitButtonLabel: 'Сохранить'
});

//экземпляр для попапа добавления карточки в галерею
const addCardPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formValidator: validatorAddCardForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    addCardPopupElement.renderLoading(true);
    api.addCard(inputValuesData)
      .then(newCardData => {
        const newCard = renderCard(newCardData);
        gallerySection.addItem(newCard);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => addCardPopupElement.renderLoading(false));
  },
  submitButtonLabel: 'Создать'
});

//экземпляр для попапа редактирования аватара в профиле
const editAvatarPopupElement = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  formValidator: validatorAvatarForm,
  handleFormSubmit: (evt, inputValuesData) => {
    evt.preventDefault();
    editAvatarPopupElement.renderLoading(true);
    api.updateAvatar(inputValuesData)
      .then(data => userInfoElement.setUserInfo(data))
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => editAvatarPopupElement.renderLoading(false));
  },
  submitButtonLabel: 'Сохранить'
})

//экземпляр для попапа удаления карточки
const popupDeleteCard = new PopupWithForm({
  popupSelector: '.popup_type_delete-card',
  formValidator: validatorDeleteCardForm,
  handleFormSubmit: (evt) => evt.preventDefault()
});

//обработчик нажатия кнопки открытия формы редактирования профиля
const handleButtonForOpenProfileInfo = () => {
  const editProfileFormInputValues = userInfoElement.getUserInfo();
  editProfilePopupElement.setInputValues(editProfileFormInputValues);
  editProfilePopupElement.open();
};

//все слушатели + включение валидации для форм
buttonOpenProfile.addEventListener('click', handleButtonForOpenProfileInfo);
buttonOpenAddCard.addEventListener('click', () => addCardPopupElement.open());
buttonOpenAvatar.addEventListener('click', () => editAvatarPopupElement.open());
addCardPopupElement.setEventListeners();
editProfilePopupElement.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
editAvatarPopupElement.setEventListeners();
validatorProfileForm.enableValidation();
validatorAddCardForm.enableValidation();
validatorAvatarForm.enableValidation();
