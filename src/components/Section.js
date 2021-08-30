export default class Section {
  constructor(api, {containerSelector, renderer}) {
    this._api = api;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    const [items, userData] = [this._api.receiveCards(), this._api.getUserData()];
    Promise.all([items, userData])
      .then(([items, userData]) => {
        items.reverse().forEach(item => {
          const itemElement = this._renderer(item, userData);
          this.addItem(itemElement);
        })
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }
}
