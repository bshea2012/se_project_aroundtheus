const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditModalClose = profileEditModal.querySelector(
  "#profile-edit-modal-close"
);
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardModalClose = addCardModal.querySelector("#add-card-modal-close");
const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitle = document.querySelector(".place__title");
const cardLink = document.querySelector(".place__link");
const cardTitleInput = document.querySelector("#place-title-input");
const cardLinkInput = document.querySelector("#place-link-input");
const addCardForm = document.forms["place-form"];

// ImageModal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = previewImageModal.querySelector(
  "#preview-image-modal-close"
);
const cardImagePreviewEl = previewImageModal.querySelector(
  ".card__image-preview"
);
const cardImagePreviewTitleEl = previewImageModal.querySelector(
  ".modal__heading-preview"
);

// Functions
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopUp(openedModal);
  }
}

function closeModalOnRemoteClick(e) {
  if (e.target === e.currentTarget) {
    closePopUp(e.currentTarget);
  }
}

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closePopUp(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-content");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopUp(previewImageModal);
    cardImagePreviewEl.src = cardData.link;
    cardImagePreviewEl.alt = cardData.name;
    cardImagePreviewTitleEl.textContent = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

// Universal Close Button
// find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  console.log(popup);
  // set the listener
  button.addEventListener("click", () => closePopUp(popup));
});

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// add new card button
addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
