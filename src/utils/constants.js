export const items = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    isArray: true
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    isArray: true
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    isArray: true
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    isArray: true
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    isArray: true
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    isArray: true
  }
];

export const validatorSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  openButtonSelector: '.button_type_open',
  closeButtonSelector: '.button_type_close',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const cardSettings = {
  cardTemplateSelector: '.gallery-item-template',
  cardElementSelector: '.gallery-table__item',
  deleteCardButtonSelector: '.button_type_delete-card',
  likeCardButtonSelector: '.button_type_like',
  cardImageContainerSelector: '.card__image-container'
}

export const profileSettings = {
  profileNameElementSelector: '.profile__name',
  profileAboutElementSelector: '.profile__about',
  profileNameInputNameAttribute: 'profile-name',
  profileAboutInputNameAttribute: 'profile-about'
}
