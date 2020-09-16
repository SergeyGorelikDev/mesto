const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const initialValidate = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const container = document.querySelector('.page');
const elementTemplate = container.querySelector('#element-template').content;
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
const popupImageViewer = container.querySelector('.popup_image_viewer');

import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = evt.currentTarget.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function setImageAttr(elem, link, name) {
    const imageItem = elem.querySelector('img');
    imageItem.setAttribute('src', link);
    imageItem.setAttribute('alt', name);
    elem.querySelector('h2').textContent = name;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupHandler);
    container.addEventListener('keydown', keyHandler);
}

function openImageViewerPopup(evt) {
    if (evt.target.classList.contains('element__photo')) {
        const link = evt.target.getAttribute('src');
        const name = evt.target.getAttribute('alt');
        setImageAttr(popupImageViewer, link, name);
        openPopup(popupImageViewer);
    }
}

initialCards.forEach((cardItem) => {
    const card = new Card(cardItem.link, cardItem.name, '#element-template');
    const cardElement = card.generateCard();
    cardElement.querySelector('.element').addEventListener('click', openImageViewerPopup);
    elementsContainer.append(cardElement);
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupHandler);
    container.removeEventListener('keydown', keyHandler);
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
    const card = new Card(linkInput.value, placeInput.value, '#element-template')
    const cardElement = card.generateCard();
    cardElement.querySelector('.element').addEventListener('click', openImageViewerPopup);
    elementsContainer.prepend(cardElement);
    inputAddCardForm.reset();
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);

const formList = Array.from(document.querySelectorAll(initialValidate.formSelector));
formList.forEach((formElement) => {
    const form = new FormValidator(initialValidate, formElement)
    form.enableValidation();
});