import Popup from "./Popup";

export default class PopupConfirmDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._closeConfirmForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(
      ".modal__button-delete"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  setConfirmDelete(func) {
    this._handleFormSubmit = func;
  }

  setButtonText(isDeleting) {
    if (isDeleting) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeConfirmForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
