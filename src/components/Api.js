export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //обработчик ответа запроса
  _responseHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //GET запрос на текущие карточки с сервера
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._responseHandler);
  }

  //GET запрос на данные пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => this._responseHandler(res));
  }

  //PATCH запрос на обновление данных пользователя
  updateUserData(inputValuesData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputValuesData.username,
        about: inputValuesData.about
      })
    })
    .then(res => this._responseHandler(res));
  }

  //POST запрос на добавление новой карточки
  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => this._responseHandler(res));
  }

  //DELETE запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._responseHandler(res));
  }

  //PUT и DELETE запрос на добавление/удаление лайка карточке
  likeCard(cardId, likeStatus) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: (likeStatus) ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(res => this._responseHandler(res));
  }

  //PATCH запрос на обновление аватара пользователя
  updateAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._responseHandler(res));
  }

}
