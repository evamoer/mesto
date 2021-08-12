import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(evt) {
    super.open();
    const fullImageElement = document.querySelector('.popup__full-image');
    const fullImageCaption = document.querySelector('.popup__full-image-caption');
    fullImageElement.src = evt.target.src;
    fullImageElement.alt = evt.target.alt;
    fullImageCaption.textContent = evt.target.alt;
  }
}
