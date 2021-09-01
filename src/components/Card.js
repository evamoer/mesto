export default class Card {
  constructor (item, userId, api,
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
      handleFullImage, handleDeleteCard) {
    //параметры, связанные с апи
    this._item = item;
    this._userId = userId;
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
    this._handleFullImage = handleFullImage;
    this._handleDeleteCard = handleDeleteCard;
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
    this._handleDeleteCard(this._item._id)
      .then(() => this._element.remove())
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  //скрываем иконку корзины, если карточка создана не нами
  _renderDeleteIcon() {

    if (this._item.owner._id !== this._userId) {
      const buttonDeleteCard = this._element.querySelector(this._deleteCardButtonSelector);
      buttonDeleteCard.style.visibility = 'hidden';
    }
  }

  //показываем состояние и счётчик кнопки лайка
  _renderLike(cardData) {
    const cardLikeNumber = this._element.querySelector(this._cardLikeNumberSelector);
    const buttonLikeCard = this._element.querySelector(this._likeCardButtonSelector);

    cardLikeNumber.textContent = cardData.likes.length;
    const isLikeActive = this._isLiked(cardData.likes);
    (isLikeActive) ? buttonLikeCard.classList.add(this._activeLikeButtonClass)
      : buttonLikeCard.classList.remove(this._activeLikeButtonClass);
  }

  //определяем, есть лайк на карточке
  _isLiked(likesArray) {
    return likesArray.some(like => like._id === this._userId);
  }

  //обрабатываем клик по кнопке лайка
  _handleLikeClick() {
    const isLikeActive = this._isLiked(this._item.likes);
    this._api.likeCard(this._item._id, isLikeActive)
      .then(updatedCardData => {
        this._renderLike(updatedCardData);
        this._item.likes = updatedCardData.likes;
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }

  //устанавливаем все обработчики карточки
  _setEventListeners() {
    const buttonDeleteCard = this._element.querySelector(this._deleteCardButtonSelector);
    const buttonLikeCard = this._element.querySelector( this._likeCardButtonSelector);
    const cardImageContainer = this._element.querySelector(this._cardImageContainerSelector);

    cardImageContainer.addEventListener('click', (evt) => this._handleFullImage({name: evt.target.alt, link: evt.target.src}));
    buttonDeleteCard.addEventListener('click', () => this._deleteCard());
    buttonLikeCard.addEventListener('click', () => this._handleLikeClick());
  }

  //создаем карточку - публично
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const cardTitle = this._element.querySelector(this._cardTitleSelector);

    //подгружаем изображение и название
    cardImage.src = this._item.link;
    cardImage.alt = this._item.name;
    cardTitle.textContent = this._item.name;
    this._renderDeleteIcon();
    this._renderLike(this._item);
    this._setEventListeners();
    return this._element;
  }
}
