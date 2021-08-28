export default class FormValidator {
    constructor({inactiveButtonClass, inputErrorClass, errorClass, submitButtonSelector, inputSelector, closeButtonSelector }, formElement) {
      this._formElement = formElement;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._errorClass = errorClass;
      this._submitButtonElement = formElement.querySelector(submitButtonSelector);
      this._inputList = Array.from(formElement.querySelectorAll(inputSelector));
      this._closeButtonElement = formElement.closest('.popup__container').querySelector(closeButtonSelector);
    }

    //определяем ошибку валидации
    _defineErrorElement(inputElement) {
      this._errorElement = this._formElement.querySelector(`#${inputElement.name}-input-error`);
      return this._errorElement;
    }

    //скрываем ошибку
    _hideInputError(inputElement, errorElement) {
      errorElement = this._defineErrorElement(inputElement);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
    }

    //показываем ошибку
    _showInputError(inputElement, errorElement) {
      errorElement = this._defineErrorElement(inputElement);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }

    //проверяем на наличие невалидных инпутов
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }

    //переключаем кнопку в нужное состояние в зависимости от валидности инпутов
    toggleSubmitButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButtonElement.setAttribute('disabled', true);
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
      }
      else {
        this._submitButtonElement.removeAttribute('disabled', false);
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      }
    }

    //переключаем инпуты в нужное состояние (валидные/невалидные)
    _toggleInputState(inputElement) {
      const inputElementValidityStatus = inputElement.validity.valid;
      if (!inputElementValidityStatus) {
        inputElement.classList.add(this._inputErrorClass);
        this._showInputError(inputElement);
      }
      else {
        inputElement.classList.remove(this._inputErrorClass);
        this._hideInputError(inputElement);
      }
    }

    //очищаем инпуты от ошибок и ставим в валидное состояние - публично
    cleanInputError() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        inputElement.classList.remove(this._inputErrorClass);
      });
    }

    //устанавливаем обработчики
    _setEventListeners() {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._toggleInputState(inputElement);
          this.toggleSubmitButtonState();
        });
      });

      this.toggleSubmitButtonState();
    }

    //запускаем валидацию - публично
    enableValidation() {
      this._setEventListeners();
    }
}
