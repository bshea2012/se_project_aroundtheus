export default class Popup {
  constructor(popupSelector) {
    this._PopupElement = document.querySelector(popupSelector);
  }

  open() {
    this._PopupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._PopupElement.addEventListener("click", this._handleRemoteClose);
  }

  close() {
    this._PopupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._PopupElement.removeEventListener("click", this._handleRemoteClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _handleRemoteClose = (e) => {
    if (e.target === e.currentTarget) {
      this.close(e.currentTarget);
    }
  };

  setEventListeners() {
    this._closeButton = this._PopupElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => this.close());
  }
}
