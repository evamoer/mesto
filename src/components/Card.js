export default class Card {
  constructor ({name, link, likes, _id, owner}, {cardTemplateSelector, cardElementSelector, deleteCardButtonSelector, deletePopupSelector, likeCardButtonSelector, cardImageContainerSelector}, handleCardClick, handleDeleteClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
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
      const deleteCardPromise = new Promise((resolve, reject) => {
        resolve(this._id);
      })
      deleteCardPromise
        .then((id) => this._handleDeleteClick(id))
        .then(() => this._deleteCard());
    });

    likeCardButtonElement.addEventListener('click', this._likeCard);
    cardImageContainerElement.addEventListener('click', this._handleCardClick);
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard(evt) {
     evt.target.classList.toggle('button_type_like-active');
  }

  _handleCardClick(evt) {
    this._handleCardClick(evt);
  }

  _handleDeleteClick(cardId) {
    this._handleDeleteClick(cardId);
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImageElement = this._element.querySelector('.card__image');
    const cardTitleElement = this._element.querySelector('.card__title');
    const cardLikeNumber = this._element.querySelector('.card__like-number');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._name;
    cardTitleElement.textContent = this._name;

    (this._likes === undefined) ? cardLikeNumber.textContent = 0 : cardLikeNumber.textContent = this._likes.length;

    if (this._owner !== undefined && this._owner.name !== document.querySelector('.profile__name').textContent) {
      this._element.querySelector('.button_type_delete-card').style.display = 'none'}

    this._setEventListeners();
    return this._element;
  }

}
