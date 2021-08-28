export default class Section {
  constructor(api, {containerSelector, renderer}) {
    this._api = api;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  //вывод и добавление карточки в галерею
  _render = (item, userData) => {
    const itemElement = this._renderer(item, userData);
    this._container.prepend(itemElement);
  }

  //добавление карточки
  addItem = (item) => {
    this._api.addCard(item)
      .then((item) => {
        this._api.getUserData()
          .then((userData) => this._render(item, userData));
      });
  }

  //получение и вывод всех текущих карточек с сервера
  receiveItems = () => {
    this._api.receiveCards()
      .then((items) => {
        this._api.getUserData()
        .then((userData) => {
          items.reverse().forEach(item => this._render(item, userData))
        })
      })
  }

}
