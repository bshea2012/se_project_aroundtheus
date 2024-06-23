export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputElements)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
    return;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    return;
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }

    this._hideInputError(inputElement);
  }

  _showInputError(inputElement) {
    const errorMsgElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMsgElement.textContent = inputElement.validationMessage;
    errorMsgElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMsgElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMsgElement.textContent = "";
    errorMsgElement.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._inputElements = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
