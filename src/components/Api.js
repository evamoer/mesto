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

  //проверка запроса при ошибке
  _errorHandler(err) {
    return console.log(`Ошибка: ${err}`);
  }

  //GET запрос на текущие карточки с сервера
  receiveCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(res => this._responseHandler(res))
      .catch(err => this._errorHandler(err));
  }

  //GET запрос на данные пользователя
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
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
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
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
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
  }

  //DELETE запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
  }

  //PUT и DELETE запрос на добавление/удаление лайка карточке
  likeCard(cardId, likeStatus) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: (likeStatus) ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
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
    .then(res => this._responseHandler(res))
    .catch(err => this._errorHandler(err));
  }

}
