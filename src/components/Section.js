export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(item) {
    this._element.prepend(item);
  }
}
