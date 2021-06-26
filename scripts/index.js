//объявляем переменные формы
const popupOpenButtonElement = document.querySelector('.button_type_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.button_type_close');
// находим форму в DOM
const formElement = document.querySelector('.popup__form');
// находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_profile-name');
const jobInput = formElement.querySelector('.popup__input_type_profile-about');
// выбираем элементы из профиля, которые должны измениться
const profileInfo = document.querySelector('.profile__info')
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
// массив с карточками для галереи
const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const galleryTemplateContent = document.querySelector('.gallery-item-template').content;
const galleryListElement = document.querySelector('.gallery-table');

function renderItem(item) {
  const galleryItemElement = galleryTemplateContent.cloneNode(true);
  const galleryItemElementText = galleryItemElement.querySelector('.card__title');
  const galleryItemImage = galleryItemElement.querySelector('.card__image');
  galleryItemImage.src = item.link;
  galleryItemImage.alt = item.name;
  galleryItemElementText.textContent = item.name;
  galleryListElement.append(galleryItemElement);
};

function renderItems(items) {
  items.forEach(renderItem);
};

//функция для открытия попапа по клику
const openPopup = function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  popupElement.classList.add('popup_opened');
}

//функция для закрытия попапа по клику
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

// обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // эта строчка отменяет стандартную отправку формы, так мы можем определить свою логику отправки
    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(); //попап закрывается при сохранении формы
}

// прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
//слушатели клика по кнопке для функций открытия-закрытия попапа
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

renderItems(items);
