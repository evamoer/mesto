export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement = this._popupElement.querySelector('.button_type_close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    const escapeKey = 'Escape';
    if (evt.key === escapeKey) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('mousedown', this.handleOverlayClick.bind(this));
  }
}

