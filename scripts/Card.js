import {openFullImage} from './index.js';

export default class Card {
    constructor (name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_delete-card').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._element.querySelector('.card__image-container').addEventListener('click', (evt) => {
            this._openFullImage(evt);
        })
    }

    _deleteCard(evt) {
        evt.target.closest('.gallery-table__item').remove();
    }

    _likeCard(evt) {
        evt.target.classList.toggle('button_type_like-active');
    }

    _openFullImage(evt) {
        openFullImage(evt);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}
