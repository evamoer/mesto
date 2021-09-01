export default class Section {
  constructor(api, {containerSelector, renderer}) {
    this._api = api;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(itemElement) {
    this._container.prepend(itemElement);
  }

  renderItems(items, userdataId) {
    items.reverse().forEach(item => {
      const itemElement = this._renderer(item, userdataId);
      this.addItem(itemElement);
    })
  }
}
