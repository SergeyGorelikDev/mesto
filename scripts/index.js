import { Section } from './Section.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const container = document.querySelector('.page');
const templateSelector = '#element-template';
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

function createCardInstance(link, name, templateSelector) {
    const card = new Card(link, name, templateSelector,
        () => {
            cardElement.querySelector('.element__photo').addEventListener('click', (evt) => {
                openImagePopup(evt);
            });
        }
    );
    const newCard = card.generateCard();
    return newCard
}

function createSection(cardItem) {
    const newSection = new Section({
        items: cardItem,
        renderer: (item) => {
            const cardElement = createCardInstance(cardItem.link, cardItem.name, templateSelector);
            cardElement.querySelector('.element__photo').addEventListener('click', (evt) => {
                openImagePopup(evt);
            });
            newSection.addItem(cardElement);
        }
    }, containerSelector);
    newSection.renderItems();
}

initialCards.forEach((cardItem) => {
    createSection(cardItem)
});

function fillUserInfo() {
    const newUserInfo = new UserInfo(profileName, profileAbout);
    return newUserInfo.getUserInfo();
}

function setUserInfo(name, about) {
    const newUserInfo = new UserInfo(profileName, profileAbout);
    return newUserInfo.setUserInfo(name, about);
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
imagePopup.setEventListeners();

function openImagePopup(evt) {
    const cardItem = evt.target;
    const link = cardItem.src;
    const name = cardItem.alt;
    imagePopup.addEventListener;
    imagePopup.open(link, name);
}

const editPopup = new PopupWithForm(popupEditProfile,
    (name, link) => {
        setUserInfo(name, link);
    }
);
editPopup.setEventListeners();

function openEditProfilePopup() {
    fillEditFormFields();
    editFormValidator.resetState();
    editPopup.open();
}

const addPopup = new PopupWithForm(popupAddCard,
    (name, link) => {
        const cardItem = { "name": name, "link": link };
        createSection(cardItem)
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