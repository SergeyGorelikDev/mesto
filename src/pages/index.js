import { Section } from '../components/Section.js';
import { initialCards } from '../constants/initial-сards';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';

const container = document.querySelector('.page');
const editProfileButton = container.querySelector('.profile__edit-button');
const addCardButton = container.querySelector('.profile__add-button');
const profileName = '.profile__title';
const profileAbout = '.profile__subtitle';
const popupEditProfile = '.popup_edit-profile';
const inputProfileEditorForm = document.forms.editProfile;
const nameInput = inputProfileEditorForm.elements.fullname;
const jobInput = inputProfileEditorForm.elements.about;
const popupAddCard = '.popup_add-photo';
const inputAddCardForm = document.forms.addPhoto;
const popupImageViewer = '.popup_image_viewer';
const containerSelector = '.elements';

const validationConfig = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function handleCardClick(evt) {
    const cardItem = evt.target;
    const link = cardItem.src;
    const name = cardItem.alt;
    imagePopup.open(link, name);
}

const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item.name, item.link, handleCardClick);
        cardSection.addItem(newCard.generateCard());
    }
}, containerSelector);
cardSection.renderItems();



const newUserInfo = new UserInfo(profileName, profileAbout);

function fillUserInfo() {
    return newUserInfo.getUserInfo();
}

function setUserInfo(paramObj) {
    return newUserInfo.setUserInfo(paramObj);
}

function fillEditFormFields() {
    const { name, about } = fillUserInfo();
    nameInput.value = name;
    jobInput.value = about;
}

const editFormValidator = new FormValidator(validationConfig, inputProfileEditorForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, inputAddCardForm);
addFormValidator.enableValidation();

const imagePopup = new PopupWithImage(popupImageViewer);

const editPopup = new PopupWithForm(popupEditProfile,
    (paramObj) => {
        setUserInfo(paramObj);
    }
);

editPopup.setEventListeners();

function openEditProfilePopup() {
    fillEditFormFields();
    editFormValidator.resetState();
    editPopup.open();
}

const addPopup = new PopupWithForm(popupAddCard,
    ({ param1, param2, ...rest }) => {
        const newCard = new Card(param1, param2, handleCardClick);
        cardSection.addItem(newCard.generateCard());
    }
);
addPopup.setEventListeners();

function openAddCardPopup() {
    inputAddCardForm.reset();
    addFormValidator.resetState();
    addPopup.open();
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);