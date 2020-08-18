const container = document.querySelector('.page');
const elementTemplate = container.querySelector('#element-template').content;

const editProfileButton = container.querySelector('.profile__edit-button');
const addCardButton = container.querySelector('.profile__add-button');
const profileName = container.querySelector('.profile__title');
const profileAbout = container.querySelector('.profile__subtitle');
const elementsContainer = container.querySelector('.elements');

const popupEditProfile = container.querySelector('.popup_edit-profile');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__close-button');
const inputProfileEditorForm = popupEditProfile.querySelector('.popup__input-form');
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const jobInput = popupEditProfile.querySelector('.popup__input_type_about');

const popupAddCard = container.querySelector('.popup_add-photo');
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button');
const inputAddCardForm = popupAddCard.querySelector('.popup__input-form');

const popupImageViewer = container.querySelector('.popup_image_viewer');
const closeImageViewerButton = popupImageViewer.querySelector('.popup__close-button');

function likeCardHandler(evt) {
    evt.target.classList.toggle('element__like_active');
}

function deleteCardHandler(evt) {
    evt.target.closest('.element').remove();
}

function setPhotoAttr(element, link, name) {
    const photoItem = element.querySelector('img');
    photoItem.setAttribute('src', link);
    photoItem.setAttribute('alt', name);
    element.querySelector('h2').textContent = name;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function createImageViewverCard(photoElement) {
    const link = photoElement.getAttribute('src');
    const name = photoElement.getAttribute('alt');
    setPhotoAttr(popupImageViewer, link, name);
    openPopup(popupImageViewer);
}

function setCardListeners(photoElement) {
    photoElement.querySelector('.element__like').addEventListener('click', function(evt) {
        likeCardHandler(evt);
    });
    photoElement.querySelector('.element__delete').addEventListener('click', function(evt) {
        deleteCardHandler(evt);
    });
    photoElement.querySelector('.element__photo').addEventListener('click', function(evt) {
        createImageViewverCard(evt.target);
    });
}

function createCard(link, name) {
    const photoElement = elementTemplate.cloneNode(true);
    setPhotoAttr(photoElement, link, name);
    setCardListeners(photoElement);
    return photoElement;
}

initialCards.forEach((elem) => {
    const photoElement = createCard(elem.link, elem.name);
    elementsContainer.append(photoElement);
})

function openEditProfilePopup(popup) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileAbout.textContent;
    openPopup(popup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    if (nameInput.value && jobInput.value) {
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
    }
    closePopup(popupEditProfile);
}

function closeAddCardPopup() {
    for (let i = 0; i < inputAddCardForm.length; i++) {
        if (inputAddCardForm[1].tagName == 'INPUT') {
            inputAddCardForm[i].value = '';
        }
    }
    return closePopup(popupAddCard);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const placeInput = popupAddCard.querySelector('.popup__input_type_name');
    const linkInput = popupAddCard.querySelector('.popup__input_type_link');
    if (placeInput.value && linkInput.value) {
        const photoElement = createCard(linkInput.value, placeInput.value);
        elementsContainer.prepend(photoElement);

    }
    closeAddCardPopup();
}

editProfileButton.addEventListener('click', function() {
    openEditProfilePopup(popupEditProfile);
});

addCardButton.addEventListener('click', function() {
    openPopup(popupAddCard);
});

closeEditProfileButton.addEventListener('click', function() {
    closePopup(popupEditProfile);
});

closeAddCardButton.addEventListener('click', function() {
    closeAddCardPopup();
});

closeImageViewerButton.addEventListener('click', function() {
    closePopup(popupImageViewer);
});

inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);