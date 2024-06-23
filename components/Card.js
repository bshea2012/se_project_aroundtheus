export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // Card Like Button
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => this._handleCardLike());
    // Card Delete Button
    this._cardDelete = this._cardElement.querySelector(".card__delete-button");
    this._cardDelete.addEventListener("click", () => this._handleCardDelete());
    // Card Preview
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.addEventListener("click", () => {
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
    this._cardElement.querySelector(".card__description-content").alt =
      this._name;
    //set event listeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleCardLike() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.classList.toggle("card__like-button_active");
  }
}
