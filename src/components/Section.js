export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.
      then(items => {
        const reversedItems = items.reverse();
        reversedItems.forEach((item) => {
          const itemElement = this._renderer(item);
          this.addItem(itemElement);
        });
      });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
