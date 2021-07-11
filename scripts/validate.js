const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//функция определения ошибки к нужному инпуту
const defineErrorElement = (formElement, inputElement) => {
  errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  return errorElement;
}

//функция вывода ошибки при невалидном инпуте
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  errorElement = defineErrorElement(formElement, inputElement);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

//функция скрытия ошибки при валидном инпуте
const hideInputError = (formElement, inputElement, settings) => {
  errorElement = defineErrorElement(formElement, inputElement);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}


//функция получения текста ошибки при невалидности инпута
const getErrorMessage = (inputElement) => {
  //если инпут не валидный
  if (!inputElement.validity.valid) {
    //если поле инпута пустое
    if (inputElement.validity.valueMissing) {
      return 'Вы пропустили это поле.'
    }
    //если вводят не ссылку (проверка на type=url)
    else if (inputElement.validity.typeMismatch) {
      return 'Введите адрес сайта.'
    }
    //в остальных случаях выводим дефолтный текст ошибки
    else {
      return inputElement.validationMessage;
    }
  }
};


//функция проверки инпута на валидность
const checkInputValidity = (formElement, inputElement, settings) => {
  const inputElementValidityStatus = inputElement.validity.valid;
  //если инпут не является валидным
  if (!inputElementValidityStatus) {
    const errorMessage = getErrorMessage(inputElement);
    inputElement.classList.add(settings.inputErrorClass);
    showInputError(formElement, inputElement, errorMessage, settings);
  }
  // если инпут является валидным
  else {
    inputElement.classList.remove(settings.inputErrorClass)
    hideInputError(formElement, inputElement, settings);
  };
  };


//функция проверки всех инпутов в форме на валидность
//если есть хоть 1 невалидный инпут - вернет true
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


//функция установки статуса кнопки сабмита для формы
const toggleSubmitButtonState = (submitFormButton, inputList, settings) => {
  //если в форме есть невалидный инпут
  if (hasInvalidInput(inputList)) {
    //кнопка сабмита становится неактивной
    submitFormButton.setAttribute('disabled', true);
    submitFormButton.classList.add(settings.inactiveButtonClass);
  }
  //если невалидные инпуты в форме отсутствуют
  else {
    //кнопка сабмита становится активной
    submitFormButton.removeAttribute('disabled', false);
    submitFormButton.classList.remove(settings.inactiveButtonClass);
  }
}

//функция очищения формы от визуальной валидации (при закрытии попапа без сабмита)
const cleanAfterCloseButtonClick = (formElement, inputList, settings) => {
  if (hasInvalidInput(inputList)) {
    inputList.forEach(inputElement => {
      inputElement.classList.remove(settings.inputErrorClass);
      hideInputError(formElement, inputElement, settings);
    });
  };
}

//функция проверки клика на кнопку закрытия попапа
const checkClickOnClosePopupButton = (closePopupButton, submitFormButton, inputList, formElement, settings) => {
  closePopupButton.addEventListener('click', function () {
    cleanAfterCloseButtonClick(formElement, inputList, settings);
  });
};


//функция установки обработчиков на все инпуты у формы
const setEventListeners = (formElement, settings) => {
  //отменяем стандартную отправку формы при нажатии на сабмит
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  //создаем список из всех инпутов
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  //также создаем кнопки сабмита и закрытия попапа, чтобы отслеживать клики по ним
  const submitFormButton = formElement.querySelector(settings.submitButtonSelector);
  const popupContainer = formElement.closest('.popup__container');
  const closePopupButton = popupContainer.querySelector('.button_type_close');
  const openPopupButtonList = Array.from(document.querySelectorAll('.button_type_open'));
  openPopupButtonList.forEach(openPopupButton => {
    openPopupButton.addEventListener('click', function() {
    toggleSubmitButtonState(submitFormButton, inputList, settings);
  });
  });

  //проверяем, был ли закрыт попап
  checkClickOnClosePopupButton(closePopupButton, submitFormButton, inputList, formElement, settings);
  //устанавливаем на каждый инпут обработчик
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      //проверяем валидность у каждого инпута
      checkInputValidity(formElement, inputElement, settings);
      //изменяем состояние кнопки сабмита в зав-ти от валидности инпутов
      toggleSubmitButtonState(submitFormButton, inputList, settings);
    })
  })
  //изменяем состояние кнопки сабмита в зав-ти от валидности инпутов
  toggleSubmitButtonState(submitFormButton, inputList, settings);
}

//функция включения валидации
const enableValidation = (settings) => { //передаем функции файл с настройками
  //формируем список из всех форм на странице
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    //для каждой формы вызываем функцию, устанавливающую необходимые обработчики
    setEventListeners(formElement, settings);
  });
}

//вызываем функцию включения валидации
enableValidation(settings);

