import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formValidator, handleFormSubmit, submitButtonLabel}) {
    super(popupSelector);
    this._formValidator = formValidator
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButtonElement = this._formElement.querySelector('.button_type_submit');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButtonLabel = submitButtonLabel;
  }

  setInputValues(inputValuesData) {
    this._inputList.forEach(input => {
      input.value = inputValuesData[input.id];
    })
  }

  _getInputValues() {
    const inputValuesData = {};
    this._inputList.forEach((input) => {
      inputValuesData[input.id] = input.value;
    })
    return inputValuesData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
      this.close();
    })
  }

  open() {
    this._formValidator.cleanInputError();
    this._formValidator.toggleSubmitButtonState();
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonElement.textContent = 'Сохранение...';
    } else {
      this._submitButtonElement.textContent = this._submitButtonLabel;
    }
  }
}
