import "./index.css";

// Import all classes
import {
  initialCards,
  addNewCardButton,
  editProfileButton,
  selectors,
  profileSelectors,
  validationSettings,
  profileTitleInput,
  profileDescriptionInput,
} from "../components/Constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithPicture from "../components/PopupWithPicture";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";

// Create instances of Classes
const ImagePreviewPopup = new PopupWithPicture(selectors.previewModal);

const CardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      CardSection.addItem(createCard(item));
    },
  },
  selectors.cardSection
);

const newCardPopup = new PopupWithForm(
  selectors.newCardModal,
  handleAddCardSubmit
);

const editUserInfo = new UserInfo(profileSelectors);

const editUserInfoPopup = new PopupWithForm(
  selectors.editProfileModal,
  handleProfileEditSubmit
);

//Initialize all instances
CardSection.renderItems();
ImagePreviewPopup.setEventListeners();
newCardPopup.setEventListeners();
editUserInfoPopup.setEventListeners();

//Specific Event Listeners
addNewCardButton.addEventListener("click", () => {
  formValidators["place-form"].resetValidation();
  newCardPopup.open();
});

editProfileButton.addEventListener("click", () => {
  const { name, job } = editUserInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = job;
  formValidators["profile-form"].resetValidation();
  editUserInfoPopup.open();
});

// Functions
function handleImageClick(link, name) {
  ImagePreviewPopup.open(link, name);
}

function handleAddCardSubmit(cardData) {
  CardSection.addItem(
    createCard({ name: cardData.title, link: cardData.link })
  );
  newCardPopup.close();
}

function handleProfileEditSubmit(cardData) {
  editUserInfo.setUserInfo(cardData.title, cardData.description);
  editUserInfoPopup.close();
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick
  );
  return cardElement.getCard();
}

//

// Validation
const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");

    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//

// Universal Close Button
// find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".modal");
  // console.log(popup);
  // set the listener
  button.addEventListener("click", () => popup.close);
});
