import "./index.css";

// Import all classes
import {
  addNewCardButton,
  editProfileButton,
  editAvatarButton,
  selectors,
  profileSelectors,
  validationSettings,
} from "../utils/Constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithPicture from "../components/PopupWithPicture";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";
import PopupConfirmDelete from "../components/PopupConfirmDelete";

// Create instances of Classes
const imagePreviewPopup = new PopupWithPicture(selectors.previewModal);

const newCardPopup = new PopupWithForm(
  selectors.newCardModal,
  handleAddCardSubmit
);

const editUserInfoPopup = new PopupWithForm(
  selectors.editProfileModal,
  handleProfileEditSubmit
);

const editAvatarPopup = new PopupWithForm(
  selectors.editAvatarModal,
  handleAvatarEditSubmit
);

const deleteCardPopup = new PopupConfirmDelete(selectors.confirmDeleteModal);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2f5abbfd-693d-4973-87a8-2e8fc711af51",
    "Content-Type": "application/json",
  },
});

//Initialize all instances
imagePreviewPopup.setEventListeners();
newCardPopup.setEventListeners();
editUserInfoPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

let cardSection;
let userInfo;

api
  .initialPageLoad()
  .then(([userData, cards]) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          cardSection.addItem(createCard(item));
        },
      },
      selectors.cardSection
    );
    cardSection.renderItems();

    userInfo = new UserInfo(profileSelectors);
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(`There is an Error: `, err); // log the error to the console
  });

//Specific Event Listeners
addNewCardButton.addEventListener("click", () => {
  formValidators["place-form"].toggleButtonState();
  newCardPopup.open();
});

let userData;

editProfileButton.addEventListener("click", () => {
  userData = userInfo.getUserInfo();
  editUserInfoPopup.setInputValues({
    title: userData.name,
    description: userData.job,
  });
  formValidators["profile-form"].resetValidation();
  editUserInfoPopup.open();
});

editAvatarButton.addEventListener("click", () => {
  userData = userInfo.getUserInfo();
  editAvatarPopup.setInputValues({
    link: userData.src,
  });
  formValidators["avatar-form"].toggleButtonState();
  editAvatarPopup.open();
});

// Functions
function handleImageClick(link, name) {
  imagePreviewPopup.open(link, name);
}

function handleAddCardSubmit(cardData) {
  newCardPopup.setButtonText(true);
  api
    .addNewCard(cardData.title, cardData.link)
    .then((data) => {
      cardSection.addItem(createCard(data));
    })
    .catch((err) => {
      console.error(`There is an Error: `, err); // log the error to the console
    })
    .finally(() => {
      newCardPopup.setButtonText(false);
    });

  newCardPopup.close();
}

function handleProfileEditSubmit(cardData) {
  editUserInfoPopup.setButtonText(true);
  api
    .editUserInfo(cardData.title, cardData.description)
    .then(() => {
      userInfo.setUserInfo(cardData.title, cardData.description);
    })
    .catch((err) => {
      console.error(`There is an Error: `, err); // log the error to the console
    })
    .finally(() => {
      editUserInfoPopup.setButtonText(false);
    });
  editUserInfoPopup.close();
}

function handleCardDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setDeleteText(true);
  deleteCardPopup.setConfirmDelete(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(`There is an Error: `, err); // log the error to the console
      })
      .finally(() => {
        deleteCardPopup.setDeleteText(false);
      });
  });
}

function handleAvatarEditSubmit(data) {
  editAvatarPopup.setButtonText(true);
  api
    .updateAvatar(data.link)
    .then(() => {
      userInfo.setUserAvatar(data.link);
    })
    .catch((err) => {
      console.error(`Avatar not updated: `, err); // log the error to the console
    })
    .finally(() => {
      editAvatarPopup.setButtonText(false);
    });

  editAvatarPopup.close();
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick,
    handleCardDeleteClick,
    handleCardLike
  );
  return cardElement.getCard();
}

function handleCardLike(data) {
  // console.log(data);
  api
    .updateLike(data._id, data._isLiked)
    .then((res) => {
      console.log(res.isLiked);
      data.isCardLiked(res.isLiked);
    })
    .catch((err) => {
      console.error(`Card not liked: `, err); // log the error to the console
    });
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