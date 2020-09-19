import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { openPopup, closePopup, closePopupHandler, pressEscHandler } from './utils.js'

const container = document.querySelector('.page');
const templateSelector = '#element-template';
const editProfileButton = container.querySelector('.profile__edit-button');
const addCardButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const elementsContainer = container.querySelector('.elements');
const popupEditProfile = container.querySelector('.popup_edit-profile');
const inputProfileEditorForm = document.forms.editProfile;
const nameInput = inputProfileEditorForm.elements.fullname;
const jobInput = inputProfileEditorForm.elements.about;
const popupAddCard = container.querySelector('.popup_add-photo');
const inputAddCardForm = document.forms.addPhoto;
const popupImageViewer = document.querySelector('.popup_image_viewer');

const validationConfig = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function createCardInstance(link, name, templateSelector) {
    const card = new Card(link, name, templateSelector);
    const newCard = card.generateCard();
    return newCard
}

initialCards.forEach((cardItem) => {
    const cardElement = createCardInstance(cardItem.link, cardItem.name, templateSelector);
    elementsContainer.append(cardElement);
});

function fillEditFormFields() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
}

const editFormValidator = new FormValidator(validationConfig, inputProfileEditorForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, inputAddCardForm);
addFormValidator.enableValidation();

function openEditProfilePopup() {
    fillEditFormFields();
    editFormValidator.resetState();
    openPopup(popupEditProfile);
}

function openAddCardPopup() {
    inputAddCardForm.reset();
    addFormValidator.resetState();
    openPopup(popupAddCard);
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const placeInput = inputAddCardForm.elements.place;
    const linkInput = inputAddCardForm.elements.link;
    const cardElement = createCardInstance(linkInput.value, placeInput.value, templateSelector);
    elementsContainer.prepend(cardElement);
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);