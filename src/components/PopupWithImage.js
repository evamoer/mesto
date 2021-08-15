import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImageElement = this._popupElement.querySelector('.popup__full-image');
    this._fullImageCaption = this._popupElement.querySelector('.popup__full-image-caption');
  }

  open(evt) {
    super.open();
    this._fullImageElement.src = evt.target.src;
    this._fullImageElement.alt = evt.target.alt;
    this._fullImageCaption.textContent = evt.target.alt;
  }
}
