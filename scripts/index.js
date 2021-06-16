//объявляем переменные формы
const popupOpenButtonElement = document.querySelector('.button_type_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.button_type_close');
// находим форму в DOM
let formElement = document.querySelector('.popup__form');
// находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_profile-name');
let jobInput = formElement.querySelector('.popup__input_type_profile-about');
// выбираем элементы из профиля, которые должны измениться
let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name');
let profileAbout = profileInfo.querySelector('.profile__about');

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
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
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
