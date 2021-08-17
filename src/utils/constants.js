export const items = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
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
