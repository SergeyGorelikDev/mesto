import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

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

function pressEscHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = evt.currentTarget.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupHandler);
    container.addEventListener('keydown', pressEscHandler);
}

function createCardInstance(link, name, templateSelector) {
    const card = new Card(link, name, templateSelector);
    const newCard = card.generateCard();
    newCard.querySelector('.element__photo').addEventListener('click', () => {
        openPopup(popupImageViewer);
    });
    return newCard
}

initialCards.forEach((cardItem) => {
    const cardElement = createCardInstance(cardItem.link, cardItem.name, templateSelector);
    elementsContainer.append(cardElement);
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupHandler);
    container.removeEventListener('keydown', pressEscHandler);
}

function closePopupHandler(evt) {
    const classSet = evt.target.classList;
    if (classSet.contains('popup_opened') || classSet.contains('popup__close-button') || classSet.contains('popup__submit-button')) {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    }
}

function openEditProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    openPopup(popupEditProfile);
}

function openAddCardPopup() {
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
    inputAddCardForm.reset();
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
    const form = new FormValidator(validationConfig, formElement)
    form.enableValidation();
});