export default class FormValidator {
    constructor(settings, formElement) {
      this._formElement = formElement;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
      this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
      this._closeButtonElement = formElement.closest('.popup__container').querySelector(settings.closeButtonSelector);
    }

    _defineErrorElement(inputElement) {
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}-input-error`);
      return this._errorElement;
    }

    _hideInputError(inputElement, errorElement) {
      errorElement = this._defineErrorElement(inputElement);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
    };

    _showInputError(inputElement, errorElement) {
      errorElement = this._defineErrorElement(inputElement);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    };

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    toggleSubmitButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButtonElement.setAttribute('disabled', true);
        this._submitButtonElement.classList.add(this._inactiveButtonClass);
      }
      else {
        this._submitButtonElement.removeAttribute('disabled', false);
        this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      }
    };

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
    };

    cleanInputError() {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        inputElement.classList.remove(this._inputErrorClass);
      });
    };

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
    };

    enableValidation() {
      this._setEventListeners();
    };
};
