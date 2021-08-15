import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formValidator, handleFormSubmit}) {
    super(popupSelector);
    this._formValidator = formValidator
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._submitButtonElement = this._formElement.querySelector('.button_type_submit');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValuesData = {};
    this._inputList.forEach((input) => {
      inputValuesData[input.name] = input.value;
    })
    return inputValuesData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonElement.addEventListener('click', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    })
    this._closeButtonElement.addEventListener('click', this.close.bind(this));
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
}
