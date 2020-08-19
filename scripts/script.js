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

function likeCardHandler(likeBtn) {
    likeBtn.classList.toggle('element__like_active');
}

function deleteCardHandler(delBtn) {
    delBtn.closest('.element').remove();
}

function setImageAttr(elem, link, name) {
    const imageItem = elem.querySelector('img');
    imageItem.setAttribute('src', link);
    imageItem.setAttribute('alt', name);
    elem.querySelector('h2').textContent = name;
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function openImageViewerPopup(iamgeElement) {
    const link = iamgeElement.getAttribute('src');
    const name = iamgeElement.getAttribute('alt');
    setImageAttr(popupImageViewer, link, name);
    openPopup(popupImageViewer);
}

function setCardListeners(card) {
    card.querySelector('.element__like').addEventListener('click', function(evt) {
        likeCardHandler(evt.target);
    });
    card.querySelector('.element__delete').addEventListener('click', function(evt) {
        deleteCardHandler(evt.target);
    });
    card.querySelector('.element__photo').addEventListener('click', function(evt) {
        openImageViewerPopup(evt.target);
    });
}

function createCard(link, name) {
    const card = elementTemplate.cloneNode(true);
    setImageAttr(card, link, name);
    setCardListeners(card);
    return card;
}

initialCards.forEach((elem) => {
    const card = createCard(elem.link, elem.name);
    elementsContainer.append(card);
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

function submitAddCardForm(evt) {
    evt.preventDefault();
    const placeInput = popupAddCard.querySelector('.popup__input_type_name');
    const linkInput = popupAddCard.querySelector('.popup__input_type_link');
    if (placeInput.value && linkInput.value) {
        const card = createCard(linkInput.value, placeInput.value);
        elementsContainer.prepend(card);

    }
    closePopup(popupAddCard);
    placeInput.value = '';
    linkInput.value = '';
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
    closePopup(popupAddCard);
});

closeImageViewerButton.addEventListener('click', function() {
    closePopup(popupImageViewer);
});

inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);