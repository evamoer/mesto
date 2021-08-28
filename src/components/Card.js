export default class Card {
  constructor (item, userData, api,
    {
      cardTemplateSelector,
      cardElementSelector,
      deleteCardButtonSelector,
      likeCardButtonSelector,
      activeLikeButtonClass,
      cardImageContainerSelector,
      cardImageSelector,
      cardTitleSelector,
      cardLikeNumberSelector
    },
      handleCardClick, handleDeleteClick) {
    //параметры, связанные с апи
    this._item = item;
    this._userData = userData;
    this._api = api;
    //параметры, связанные с карточкой
    this._cardTemplateSelector = cardTemplateSelector;
    this._cardElementSelector = cardElementSelector;
    this._deleteCardButtonSelector = deleteCardButtonSelector;
    this._likeCardButtonSelector = likeCardButtonSelector;
    this._activeLikeButtonClass = activeLikeButtonClass;
    this._cardImageContainerSelector = cardImageContainerSelector;
    this._cardImageSelector = cardImageSelector;
    this._cardTitleSelector = cardTitleSelector;
    this._cardLikeNumberSelector = cardLikeNumberSelector;
    //параметры, связанные с обработчиками кликов
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  //получаем темплейт карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content.querySelector(this._cardElementSelector)
    .cloneNode(true);
    return cardElement;
  }

  //удаляем карточку при сабмите во всплывающем окне
  _deleteCard() {
    this._handleDeleteClick(this._item._id)
      .then(() => this._element.remove());
  }

  //показываем состояние и счётчик кнопки лайка
  _renderLike(cardData, likeStatus) {
    const cardLikeNumber = this._element.querySelector(this._cardLikeNumberSelector);
    const buttonLikeCard = this._element.querySelector(this._likeCardButtonSelector);
    cardLikeNumber.textContent = cardData.likes.length;
    if (likeStatus) {
      buttonLikeCard.classList.remove(this._activeLikeButtonClass);
    } else {
      buttonLikeCard.classList.add(this._activeLikeButtonClass);
    }
  }

  //обрабатываем клик по кнопке лайка
  _handleLikeClick(evt) {
    //проверяем, есть ли лайк на карточке уже или нет
    const likeStatus = evt.target.classList.contains(this._activeLikeButtonClass);
    //если есть, то убираем лайк
    if (likeStatus) {
      this._api.unlikeCard(this._item._id)
        .then(cardData => this._renderLike(cardData, likeStatus))
    } else { //если нет, то ставим лайк
      this._api.likeCard(this._item._id)
        .then(cardData => this._renderLike(cardData, likeStatus));
    }
  }

  //перечисляем все обработчики карточки
  _setEventListeners(buttonDeleteCard, buttonLikeCard, cardImageContainer) {
    cardImageContainer.addEventListener('click', this._handleCardClick);
    buttonDeleteCard.addEventListener('click', this._deleteCard.bind(this));
    buttonLikeCard.addEventListener('click', (evt) => this._handleLikeClick(evt));
  }

  //создаем карточку - публично
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardTitle = this._element.querySelector(this._cardTitleSelector);
    const buttonDeleteCard = this._element.querySelector(this._deleteCardButtonSelector);
    const buttonLikeCard = this._element.querySelector( this._likeCardButtonSelector);
    const cardImageContainer = this._element.querySelector(this._cardImageContainerSelector);

    //подгружаем изображение и название
    cardImage.src = this._item.link;
    cardImage.alt = this._item.name;
    cardTitle.textContent = this._item.name;

    //если карточка создана не нами, то скрываем кнопку удаления
    if (this._item.owner._id !== this._userData._id) {
      buttonDeleteCard.style.visibility = 'hidden';
    }

    //показываем состояние и счётчик кнопки лайка
    if (this._item.likes.length > 0) {
      this._item.likes.forEach((like) => {
        if (like._id === this._userData._id) {
          this._renderLike(this._item, false)
        } else {
          this._renderLike(this._item, true)
        }
      })
    } else {
      this._renderLike(this._item, true)
    }

    //устанавливаем обработчики на карточку и возвращаем её
    this._setEventListeners(buttonDeleteCard, buttonLikeCard, cardImageContainer);
    return this._element;
  }
}
