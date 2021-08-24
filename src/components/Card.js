export default class Card {
    constructor ({name, link, likes}, {cardTemplateSelector, cardElementSelector, deleteCardButtonSelector, deletePopupSelector, likeCardButtonSelector, cardImageContainerSelector}, handleCardClick, handleDeleteClick) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._cardElementSelector = cardElementSelector;
        this._deleteCardButtonSelector = deleteCardButtonSelector;
        this._deletePopupSelector = deletePopupSelector;
        this._likeCardButtonSelector = likeCardButtonSelector;
        this._cardImageContainerSelector = cardImageContainerSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector(this._cardElementSelector).cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
      const deleteCardButtonElement = this._element.querySelector(this._deleteCardButtonSelector);
      const likeCardButtonElement = this._element.querySelector(this._likeCardButtonSelector);
      const cardImageContainerElement = this._element.querySelector(this._cardImageContainerSelector);

      deleteCardButtonElement.addEventListener('click', () => {
        this._handleDeleteClick();
        this._deleteCard();
      });
      likeCardButtonElement.addEventListener('click', this._likeCard);
      cardImageContainerElement.addEventListener('click', this._handleCardClick);
    }

    _deleteCard() {
      console.log(this._deletePopupSelector);
      const popupDeleteCard = document.querySelector(this._deletePopupSelector);
      console.log(popupDeleteCard);
        /*this._element.remove();*/
    }

    _likeCard(evt) {
      evt.target.classList.toggle('button_type_like-active');
    }

    _handleCardClick(evt) {
      this._handleCardClick(evt);
    }

    _handleDeleteClick() {
      this._handleDeleteClick();
    }

    generateCard() {
        this._element = this._getTemplate();
        const cardImageElement = this._element.querySelector('.card__image');
        const cardTitleElement = this._element.querySelector('.card__title');
        const cardLikeNumber = this._element.querySelector('.card__like-number');
        cardImageElement.src = this._link;
        cardImageElement.alt = this._name;
        cardTitleElement.textContent = this._name;
        cardLikeNumber.textContent = this._likes.length;
        this._setEventListeners();
        return this._element;
    }
}
