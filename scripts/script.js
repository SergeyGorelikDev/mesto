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
let submitCurrentFunction = null;

function likeCardHandler(evt) {
    if (evt.target.classList.contains('element__like')) {
        evt.target.classList.toggle('element__like_active');
    }
}

function deleteCardHandler(evt) {
    if (evt.target.classList.contains('element__delete')) {
        evt.target.closest('.element').remove();
    }
}

function setImageAttr(elem, link, name) {
    const imageItem = elem.querySelector('img');
    imageItem.setAttribute('src', link);
    imageItem.setAttribute('alt', name);
    elem.querySelector('h2').textContent = name;
}

function closePopup(evt) {
    const classSet = evt.target.classList;
    if (classSet.contains('popup_opened') || classSet.contains('popup__close-button') || classSet.contains('popup__submit-button')) {
        const popUp = evt.target.closest('.popup');
        removeClosePopupListners(popUp);
        addOpenPoputListners();
        popUp.classList.remove('popup_opened');
    }
}

function addClosePopupListners(popup) {
    popup.addEventListener('click', closePopup);
}

function removeClosePopupListners(popup) {
    popup.removeEventListener('click', closePopup);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    removeOpenPoputListners();
    addClosePopupListners(popup);
}

function addOpenPoputListners() {
    elementsContainer.addEventListener('click', openImageViewerPopup);
    editProfileButton.addEventListener('click', openEditProfilePopup);
    addCardButton.addEventListener('click', openPopup);
}

function removeOpenPoputListners() {
    elementsContainer.removeEventListener('click', openImageViewerPopup);
    editProfileButton.removeEventListener('click', openEditProfilePopup);
    addCardButton.removeEventListener('click', openPopup);
}

function openImageViewerPopup(evt) {
    likeCardHandler(evt);
    deleteCardHandler(evt);
    if (evt.target.classList.contains('element__photo')) {
        const link = evt.target.getAttribute('src');
        const name = evt.target.getAttribute('alt');
        setImageAttr(popupImageViewer, link, name);
        openPopup(popupImageViewer);
    }
}

function createCard(link, name) {
    const card = elementTemplate.cloneNode(true);
    setImageAttr(card, link, name);
    return card;
}

initialCards.forEach((elem) => {
    const card = createCard(elem.link, elem.name);
    elementsContainer.append(card);
})

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
    if (nameInput.value && jobInput.value) {
        profileName.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
    }
    //removeClosePopupListners(popupEditProfile);
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const placeInput = inputAddCardForm.elements.place;
    const linkInput = inputAddCardForm.elements.link;
    if (placeInput.value && linkInput.value) {
        const card = createCard(linkInput.value, placeInput.value);
        elementsContainer.prepend(card);
    }
    inputAddCardForm.reset();
}

elementsContainer.addEventListener('click', openImageViewerPopup);
editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
inputProfileEditorForm.addEventListener('submit', submitEditProfileForm);
inputAddCardForm.addEventListener('submit', submitAddCardForm);