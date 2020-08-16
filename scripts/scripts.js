const container = document.querySelector('.page');
const editButton = container.querySelector('.profile__edit-button');
const addutton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const elementContainer = container.querySelector(".elements");

const popUpProfile = container.querySelector('.popup_edit-profile');
const closeProfileButton = popUpProfile.querySelector('.popup__close-button');
const inputProfileForm = popUpProfile.querySelector('.popup__input-form');
const nameInput = popUpProfile.querySelector('.popup__input_type_name');
const jobInput = popUpProfile.querySelector('.popup__input_type_about');

const popUpPhoto = container.querySelector('.popup_add-photo');
const closePhotoButton = popUpPhoto.querySelector('.popup__close-button');
const inputPhotoForm = popUpPhoto.querySelector('.popup__input-form');

const popUpImageViewer = container.querySelector('.popup_image_viewer');
const closeImageViewerButton = popUpImageViewer.querySelector('.popup__close-button');

const elementTemplate = container.querySelector('#element-template').content;

const initialCards = [
    {
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

const initCards = initialCards.forEach((elem) => {
    let photoElement = elementTemplate.cloneNode(true);
    photoElement.querySelector('.element__photo').setAttribute('src', elem.link);
    photoElement.querySelector('.element__photo').setAttribute('alt', elem.name);
    photoElement.querySelector('.element__title').textContent = elem.name;
    photoListener(photoElement);
    elementContainer.append(photoElement);

});

function  photoListener(photoElement)  {
    photoElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    photoElement.querySelector('.element__delete').addEventListener('click', function (evt) {
        const removeElement = evt.target.closest('.element');
        removeElement.remove();
    });
    photoElement.querySelector('.element__photo').addEventListener('click', function (evt) {
        formEditHandler(popUpImageViewer);
        popUpImageViewer.querySelector('.popup__photo').setAttribute('src', evt.target.getAttribute('src'));
        popUpImageViewer.querySelector('.popup__photo').setAttribute('alt', evt.target.getAttribute('alt'));
        popUpImageViewer.querySelector('.popup__header_location_bottom').textContent = evt.target.getAttribute('alt');
    });
}

function formEditHandler(popUp) {
    if (popUp.classList.contains('popup_edit-profile')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileAbout.textContent;
    };
    popUp.classList.add('popup_opened');
    container.classList.add('page_overlaid');
}

function formCloseHandler(popUp) {
    popUp.classList.remove('popup_opened');
    container.classList.remove('page_overlaid');
}

function ProfileFormSubmitHandler (evt) {
    evt.preventDefault();
    if (nameInput.value && jobInput.value) {
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
    }
    formCloseHandler(popUpProfile);
 }

 function PhotoFormSubmitHandler (evt) {
     evt.preventDefault();
     const photoElement = elementTemplate.cloneNode(true);
     const placeInput = popUpPhoto.querySelector('.popup__input_type_name');
     const linkInput = popUpPhoto.querySelector('.popup__input_type_link');
     if (placeInput.value && linkInput.value) {
        photoElement.querySelector('.element__photo').setAttribute('src', linkInput.value);
        photoElement.querySelector('.element__photo').setAttribute('alt', placeInput.value);
        photoElement.querySelector('.element__title').textContent = placeInput.value;
        photoListener(photoElement);
        elementContainer.prepend(photoElement);
        placeInput.value = '';
        linkInput.value = '';
     }
     formCloseHandler(popUpPhoto);
  }

editButton.addEventListener("click", function(){
    formEditHandler(popUpProfile);
});

addutton.addEventListener("click", function(){
    formEditHandler(popUpPhoto);
});

closeProfileButton.addEventListener("click", function(){
    formCloseHandler(popUpProfile);
});

closePhotoButton.addEventListener("click", function(){
    formCloseHandler(popUpPhoto);
});

closeImageViewerButton.addEventListener("click", function(){
    formCloseHandler(popUpImageViewer);
});

inputProfileForm.addEventListener('submit',ProfileFormSubmitHandler);
inputPhotoForm.addEventListener('submit',PhotoFormSubmitHandler);