import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImageElement = this._popupElement.querySelector('.popup__full-image');
    this._fullImageCaption = this._popupElement.querySelector('.popup__full-image-caption');
  }

  open({name, link}) {
    super.open();
    this._fullImageElement.src = link;
    this._fullImageElement.alt = name;
    this._fullImageCaption.textContent = name;
  }
}
