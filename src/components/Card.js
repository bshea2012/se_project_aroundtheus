export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDeleteClick,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLike = handleCardLike;
  }

  _setEventListeners() {
    // Card Like Button
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () =>
      this._handleCardLike(this)
    );
    // Card Delete Button
    this._cardDelete = this._cardElement.querySelector(".card__delete-button");
    this._cardDelete.addEventListener("click", () =>
      this._handleCardDeleteClick(this)
    );
    // Card Preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ link: this._link, name: this._name });
    });
  }

  getCard() {
    // Create from Template
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //get the card view
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardElement.querySelector(".card__description-content").textContent =
      this._name;
    this._cardImage.alt = this._name;
    //set event listeners
    this._setEventListeners();

    this._updateLikeButton();

    //return the card
    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  isCardLiked(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeButton();
  }

  isLiked() {
    return this._isLiked;
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }
}
