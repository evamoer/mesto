export default class Card {
    constructor (name, link, cardTemplateSelector, cardElementSelector, openFullImage) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._cardElementSelector = cardElementSelector;
        this._openFullImage = openFullImage;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector(this._cardElementSelector).cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_delete-card').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._element.querySelector('.card__image-container').addEventListener('click', (evt) => {
            this._openFullImage(evt);
        })
    }

    _deleteCard() {
        this._element.remove();
    }

    _likeCard(evt) {
        evt.target.classList.toggle('button_type_like-active');
    }

    _openFullImage(evt) {
        this._openFullImage(evt);
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardImageElement = this._element.querySelector('.card__image');
        const cardTitleElement = this._element.querySelector('.card__title');
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        cardTitleElement.textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}
