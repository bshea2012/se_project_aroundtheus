import Popup from "./Popup.js";

export default class PopupWithPicture extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".card__image-preview");
    this._popupCaption = this._popupElement.querySelector(
      ".modal__heading-preview"
    );
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}
