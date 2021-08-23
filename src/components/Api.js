export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getUserProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  updateUserProfileData(inputValuesData) {
    console.log(inputValuesData);
    fetch('https://mesto.nomoreparties.co/v1/cohort-27/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '8db06075-d4ea-471e-8c36-db2b91e349e8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValuesData.name,
        about: inputValuesData.about
      })
    });
  }


}
