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
      handleFullImage, handleDeleteCard) {
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

  //обрабатываем клик по карточке => передаем данные о ней в попап с полным изображением
  _openFullImage(evt) {
    const imageData = {name: evt.target.alt, link: evt.target.src};
    this._handleFullImage(imageData);
  }

  //удаляем карточку при сабмите во всплывающем окне
  _deleteCard() {
    this._handleDeleteCard(this._item._id)
      .then(() => this._element.remove())
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  //показываем состояние и счётчик кнопки лайка
  _renderLike(cardData) {
    const cardLikeNumber = this._element.querySelector(this._cardLikeNumberSelector);
    const buttonLikeCard = this._element.querySelector(this._likeCardButtonSelector);
    cardLikeNumber.textContent = cardData.likes.length;

    this._isLiked(cardData.likes)
      .then(isLikeActive => {
        if (isLikeActive) {
          buttonLikeCard.classList.add(this._activeLikeButtonClass);
        } else {
          buttonLikeCard.classList.remove(this._activeLikeButtonClass);
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  //определяем, есть лайк на карточке (true) или нет (false)
  _isLiked(arrLikes) {
    return new Promise ((resolve, reject) => {
      resolve(arrLikes.some(like => like._id === this._userData._id));
    })
  }

  //определяем _актуальные_ данные по карточке
  _getCardData() {
    return this._api.receiveCards()
      .then(cardsArray => {
        return (cardsArray.find(card => card._id === this._item._id));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  //обрабатываем клик по кнопке лайка
  _handleLikeClick() {
    this._getCardData()
      .then(cardData => this._isLiked(cardData.likes))
      .then(isLikeActive => { //если true - убираем, если false - ставим
        this._api.likeCard(this._item._id, isLikeActive)
          .then(updatedCardData => {
            this._renderLike(updatedCardData);
          })
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }

  //перечисляем все обработчики карточки
  _setEventListeners(buttonDeleteCard, buttonLikeCard, cardImageContainer) {
    cardImageContainer.addEventListener('click', (evt) => this._openFullImage(evt));
    buttonDeleteCard.addEventListener('click', () => this._deleteCard());
    buttonLikeCard.addEventListener('click', () => this._handleLikeClick());
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
    this._renderLike(this._item);

    //устанавливаем обработчики на карточку и возвращаем её
    this._setEventListeners(buttonDeleteCard, buttonLikeCard, cardImageContainer);
    return this._element;
  }
}
