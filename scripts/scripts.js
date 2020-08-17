const container = document.querySelector('.page');
const elementTemplate = container.querySelector('#element-template').content;

const editButton = container.querySelector('.profile__edit-button');
const addButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const elementsContainer = container.querySelector('.elements');

const popupProfile = container.querySelector('.popup_edit-profile');
const closeProfileButton = popupProfile.querySelector('.popup__close-button');
const inputProfileForm = popupProfile.querySelector('.popup__input-form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_about');

const popupPhoto = container.querySelector('.popup_add-photo');
const closePhotoButton = popupPhoto.querySelector('.popup__close-button');
const inputPhotoForm = popupPhoto.querySelector('.popup__input-form');

const popupImageViewer = container.querySelector('.popup_image_viewer');
const closeImageViewerButton = popupImageViewer.querySelector('.popup__close-button');

function setPhotoAttr(element, link, name) {
    const photoItem = element.querySelector('.element__photo');
    photoItem.setAttribute('src', link);
    photoItem.setAttribute('alt', name);
    element.querySelector('.element__title').textContent = name;
}

    initialCards.forEach((elem) => {
    const photoElement = elementTemplate.cloneNode(true);
    setPhotoAttr(photoElement, elem.link, elem.name);
    setCardListeners(photoElement);
    elementsContainer.append(photoElement);
})

function likeCardHandler (evt) {
    evt.target.classList.toggle('element__like_active');
}

function deleteCardHandler (evt) {
    evt.target.closest('.element').remove();
}

function choosePhoto (evt) {
    const shownPhoto = popupImageViewer.querySelector('.popup__photo')
    shownPhoto.setAttribute('src', evt.target.getAttribute('src'));
    shownPhoto.setAttribute('alt', evt.target.getAttribute('alt'));
    popupImageViewer.querySelector('.popup__header_location_bottom').textContent = evt.target.getAttribute('alt');
}

function setCardListeners(photoElement)  {
    photoElement.querySelector('.element__like').addEventListener('click', function (evt) {
        likeCardHandler(evt);
    });
    photoElement.querySelector('.element__delete').addEventListener('click', function (evt) {
        deleteCardHandler(evt);
    });
    photoElement.querySelector('.element__photo').addEventListener('click', function (evt) {
        choosePhoto(evt);
        openPopup(popupImageViewer);
    });
}

function setEditPopup(popup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    openPopup(popup);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitEditForm (evt) {
    evt.preventDefault();
    if (nameInput.value && jobInput.value) {
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
    }
    closePopup(popupProfile);
 }

 function submitPhotoForm (evt) {
     evt.preventDefault();
     const photoElement = elementTemplate.cloneNode(true);
     const placeInput = popupPhoto.querySelector('.popup__input_type_name');
     const linkInput = popupPhoto.querySelector('.popup__input_type_link');
     const photoItem = photoElement.querySelector('.element__photo');
     if (placeInput.value && linkInput.value) {
        setPhotoAttr(photoElement, linkInput.value, placeInput.value);
        setCardListeners(photoElement);
        elementsContainer.prepend(photoElement);
        placeInput.value = '';
        linkInput.value = '';
     }
     closePopup(popupPhoto);
  }

editButton.addEventListener('click', function(){
    setEditPopup(popupProfile);
});

addButton.addEventListener('click', function(){
    openPopup(popupPhoto);
});

closeProfileButton.addEventListener('click', function(){
    closePopup(popupProfile);
});

closePhotoButton.addEventListener('click', function(){
    closePopup(popupPhoto);
});

closeImageViewerButton.addEventListener('click', function(){
    closePopup(popupImageViewer);
});

inputProfileForm.addEventListener('submit', submitEditForm);
inputPhotoForm.addEventListener('submit', submitPhotoForm);