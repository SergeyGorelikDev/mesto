let container = document.querySelector('.page');
let popUp = container.querySelector('.popup');
let editButton = container.querySelector('.profile__edit-button');
let closeButton = container.querySelector('.popup__close-button');
let sumbitButton = container.querySelector('.popup__submit-button');
let profileName = container.querySelector('.profile__title');
let profileAbout = container.querySelector('.profile__subtitle');

function formEditHandler() {
    let popUpName = container.querySelector('.popup__input_type_name');
    let popUpAbout = container.querySelector('.popup__input_type_about');
    popUpName.value = profileName.textContent;
    popUpAbout.value = profileAbout.textContent;
    popUp.classList.add('popup_opened');
    
}

function formCloseHandler() {
    popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = container.querySelector('.popup__input_type_name');
    let jobInput = container.querySelector('.popup__input_type_about');

    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    popUp.classList.remove('popup_opened');
 }

editButton.addEventListener('click',formEditHandler);
closeButton.addEventListener('click',formCloseHandler);
sumbitButton.addEventListener('click',formSubmitHandler);