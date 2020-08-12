const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const popUp = container.querySelector('.popup');
const closeButton = popUp.querySelector('.popup__close-button');
const inputForm = popUp.querySelector('.popup__input-form');
const nameInput = popUp.querySelector('.popup__input_type_name');
const jobInput = popUp.querySelector('.popup__input_type_about');

function formEditHandler() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    popUp.classList.add('popup_opened');
}

function formCloseHandler() {
    popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    formCloseHandler();
 }

editButton.addEventListener('click',formEditHandler);
closeButton.addEventListener('click',formCloseHandler);
inputForm.addEventListener('submit',formSubmitHandler);