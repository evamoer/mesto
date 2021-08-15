export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      const itemElement = this._renderer(item);
      this._container.append(itemElement);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }

}
