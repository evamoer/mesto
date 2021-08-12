import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, openButtonSelector, handleFormSubmit}) {
    super(popupSelector, openButtonSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._submitButtonElement = this._formElement.querySelector('.button_type_submit');
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButtonElement.addEventListener('click', (evt) => {
      this._handleFormSubmit(evt);
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
