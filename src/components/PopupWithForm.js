import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
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

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
    super.setEventListeners();
  }

  setButtonText(isSaving) {
    if (isSaving) {
      this._submitButtonText = "Saving";
    } else {
      this._submitButtonText = this._submitButton;
    }
  }
}
