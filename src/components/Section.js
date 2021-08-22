export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.
    then(data => {
      this._reversedItems = data.reverse();
      this._reversedItems.forEach((item) => {
        this._renderer(item)
      });
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
