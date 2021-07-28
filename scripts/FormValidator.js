import {settings} from './validation-settings.js';

export default class FormValidator {
    constructor(settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._openButtonSelector = settings.openButtonSelector,
        this._closeButtonSelector = settings.closeButtonSelector,
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._formElement = formElement;
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

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleSubmitButtonState(inputList) {
        const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput(inputList)) {
            submitButtonElement.setAttribute('disabled', true);
            submitButtonElement.classList.add(this._inactiveButtonClass);
        }
        else {
            submitButtonElement.removeAttribute('disabled', false);
            submitButtonElement.classList.remove(settings.inactiveButtonClass);
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

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const closeButtonElement = this._formElement.closest('.popup__container').querySelector('.button_type_close');
        const openButtonList = Array.from(document.querySelectorAll('.button_type_open'));

        openButtonList.forEach((openButtonElement) => {
            openButtonElement.addEventListener('click', () => {
                this._toggleSubmitButtonState(inputList);
            })
        });

        closeButtonElement.addEventListener('click', () => {
            if (this._hasInvalidInput(inputList)) {
                inputList.forEach((inputElement) => {
                    this._hideInputError(inputElement);
                    inputElement.classList.remove(this._inputErrorClass);
                });
            }
        });

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleSubmitButtonState(inputList);
            });
        });

        this._toggleSubmitButtonState(inputList);
    };

    enableValidation() {
        this._setEventListeners();
    };
}
