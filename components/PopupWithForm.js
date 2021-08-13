import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, openButtonSelector, handleFormSubmit}) {
    super(popupSelector, openButtonSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._formElement = this._popupElement.querySelector('.popup__form');
      this._submitButtonElement = this._formElement.querySelector('.button_type_submit');
      this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    })
    return formValues;
  }

  setInputValues(userData) {
    document.getElementsByName["profile-name"] = userData["profile-name"];
    document.getElementsByName["profile-about"] = userData["profile-about"];
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButtonElement.addEventListener('click', (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
