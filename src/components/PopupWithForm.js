import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(PopupSelector, handleFormSubmit) {
    super(PopupSelector);
    this._PopupForm = this._PopupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._PopupForm.querySelectorAll(".modal__input");
  }

  close() {
    this._PopupForm.reset();
    super.close();
  }

  _getInputValues() {
    // Create an empty object
    const formValues = {};

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    // Return the values object
    return formValues;
  }

  setEventListeners() {
    this._PopupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}
