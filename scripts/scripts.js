let container = document.querySelector('.page');
let popUp = container.querySelector('.popup');
let editButton = container.querySelector('.profile__edit-button');
let closeButton = container.querySelector('.popup__close-button');
let inputForm = container.querySelector('.popup__input-form');
let profileName = container.querySelector('.profile__title');
let profileAbout = container.querySelector('.profile__subtitle');
let nameInput = container.querySelector('.popup__input_type_name');
let jobInput = container.querySelector('.popup__input_type_about');

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
console.log(inputForm);
inputForm.addEventListener('submit',formSubmitHandler);