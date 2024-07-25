import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._closeConfirmForm = this._popupElement.querySelector(".modal__form");
  }

  setConfirmDelete(func) {
    this._handleFormSubmit = func;
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeConfirmForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
