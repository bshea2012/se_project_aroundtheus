export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // Card Like Button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleCardLike());
    // Card Delete Button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleCardDelete());
    // Card Preview
    this._cardElement.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  getCard() {
    // Create from Template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //get the card view
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__description-content").textContent =
      this._name;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }

  _handleCardDelete() {
    this._cardElement.remove();
  }

  _handleCardLike() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
}
