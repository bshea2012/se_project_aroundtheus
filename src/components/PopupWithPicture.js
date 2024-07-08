import Popup from "./Popup.js";

export default class PopupWithPicture extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._PopupImage = this._PopupElement.querySelector(".card__image-preview");
    this._PopupCaption = this._PopupElement.querySelector(
      ".modal__heading-preview"
    );
  }

  open(data) {
    this._PopupImage.src = data.link;
    this._PopupImage.alt = data.name;
    this._PopupCaption.textContent = data.name;
    super.open();
  }
}
