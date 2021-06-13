console.log('Hello World');
//объявляем переменные для действия с попапом

const popupOpenButtonElement = document.querySelector('.button_type_edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.button_type_close');
console.log(popupOpenButtonElement, popupElement, popupCloseButtonElement);

//функция для открытия попапа по клику
const openPopup = function() {
  popupElement.classList.add('popup_opened');
  console.log('Open popup clicked');
}

//функция для закрытия попапа по клику
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
  console.log('Close popup clicked');
}

//слушатели клика по кнопке для функций открытия-закрытия попапа
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_profile-name');
let jobInput = formElement.querySelector('.popup__input_type_profile-about');
console.log(formElement, nameInput, jobInput);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.

    // смотрим значения полей jobInput и nameInput из свойства value
    console.log(nameInput.value, jobInput.value);

    // выбираем элементы из профиля, которые должны измениться
    let profileInfo = document.querySelector('.profile__info')
    let profileName = profileInfo.querySelector('.profile__name');
    let profileAbout = profileInfo.querySelector('.profile__about');
    console.log(profileName, profileAbout);

    // вставляем новые значения из формы в элементы профиля с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    closePopup(); //попап закрывается при сохранении формы
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
