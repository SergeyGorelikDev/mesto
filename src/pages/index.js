import { Api } from '../components/Api.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';

const container = document.querySelector('.page');
const editProfileButton = container.querySelector('.profile__edit-button');
const addCardButton = container.querySelector('.profile__add-button');
const updateAvatarButton = container.querySelector('.profile__edit');
const profileName = '.profile__title';
const profileAbout = '.profile__subtitle';
const profileAvatar = '.profile__avatar';
const popupEditProfile = '.popup_edit-profile';
const inputProfileEditorForm = document.forms.editProfile;
const nameInput = inputProfileEditorForm.elements.name;
const jobInput = inputProfileEditorForm.elements.about;
const popupAddCard = '.popup_add-photo';
const popupConfirm = '.popup_confirm';
const inputAddCardForm = document.forms.addPhoto;
const popupUpdateAvatar = '.popup_update-avatar';
const inputUpdateAvatardForm = document.forms.updatePhoto;
const popupImageViewer = '.popup_image_viewer';
const containerSelector = '.elements';
const templateSelector = '#element-template';
let userID;

const validationConfig = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const newUserInfo = new UserInfo(profileName, profileAbout, profileAvatar);

function fillUserInfo() {
    return newUserInfo.getUserInfo();
}

function setUserInfo(paramObj) {
    return newUserInfo.setUserInfo(paramObj);
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
    headers: {
        authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
        'Content-Type': 'application/json'
    }
});

api.getInformation()
    .then((result) => {
        userID = result._id;
        setUserInfo({
            "name": result.name,
            "about": result.about,
            "avatar": result.avatar
        });
    })
    .catch((err) => {
        console.log(err);
    });

function handleDeleteIconClick(evt) {
    evt.target.closest('.element').remove();
}

function handleLikeIconClick(evt) {
    const element = evt.target.closest('.element');
    const isLiked = evt.target.classList.contains('element__like_active');
    const photoID = element.querySelector('.element__photo').id;
    const countOfLike = element.querySelector('.element__amount');
    if (isLiked) {
        api.unlikePhoto(photoID)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((data) => {
                countOfLike.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.likePhoto(photoID)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((data) => {
                countOfLike.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    evt.target.classList.toggle('element__like_active');
}

const confirmPopup = new PopupWithSubmit(popupConfirm, {
    handleCardClick: (evt) => {
        const photoID = evt.target.nextElementSibling.id;
        api.deletePhoto(photoID)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
        handleDeleteIconClick(evt);
    }
});

confirmPopup.setEventListeners();

function getNewCardSection(initialCards) {
    const cardSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const newCard = new Card({
                data: {
                    "name": item.name,
                    "link": item.link,
                    "likes": item.likes,
                    "_id": item._id,
                    "owner": item.owner,
                    "userID": userID,
                    "whoLiked": item.likes
                },
                handleCardClick: (evt) => {
                    const cardItem = evt.target;
                    const link = cardItem.src;
                    const name = cardItem.alt;
                    imagePopup.open(link, name);
                },
                handleLikeClick: (evt) => {
                    handleLikeIconClick(evt);
                },
                handleDeleteIconClick: (evt) => {
                    confirmPopup.open();
                    confirmPopup.chooseFunc(evt);
                }
            }, templateSelector);
            cardSection.addItem(newCard.generateCard());
        }
    }, containerSelector);
    return cardSection;
}

api.getInitialCards()
    .then((result) => {
        const initialCards = result;
        getNewCardSection(initialCards).renderItems();
    })
    .catch((err) => {
        console.log(err);
    });

function fillEditFormFields() {
    const { name, about } = fillUserInfo();
    nameInput.value = name;
    jobInput.value = about;
}

function renderLoading(popupEditProfile, isLoading) {
    const popup = document.querySelector(popupEditProfile);
    const sumbitButton = popup.querySelector('.popup__submit-button');
    if (isLoading) {
        sumbitButton.textContent = 'Сохранение...'
    } else {
        sumbitButton.textContent = 'Сохраненить'
    }
}

const editFormValidator = new FormValidator(validationConfig, inputProfileEditorForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationConfig, inputAddCardForm);
addFormValidator.enableValidation();

const updateAvatarValidator = new FormValidator(validationConfig, inputUpdateAvatardForm);
updateAvatarValidator.enableValidation();

const imagePopup = new PopupWithImage(popupImageViewer);

const editPopup = new PopupWithForm(popupEditProfile,
    (paramObj) => {
        renderLoading(popupEditProfile, true);
        api.updateInformation(paramObj)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((data) => {
                setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(popupEditProfile, false);
            });
    }
);

editPopup.setEventListeners();

function openEditProfilePopup() {
    fillEditFormFields();
    editFormValidator.resetState();
    editPopup.open();
}

const addPopup = new PopupWithForm(popupAddCard,
    (paramObj) => {
        renderLoading(popupAddCard, true);
        api.postPhoto(paramObj)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((data) => {
                data.userID = userID;
                const newCard = new Card({
                    data: data,
                    handleCardClick: (evt) => {
                        const cardItem = evt.target;
                        const link = cardItem.src;
                        const name = cardItem.alt;
                        imagePopup.open(link, name);
                    },
                    handleLikeClick: (evt) => {
                        handleLikeIconClick(evt);
                    },
                    handleDeleteIconClick: (evt) => {
                        confirmPopup.open();
                        confirmPopup.chooseFunc(evt);
                    }
                }, templateSelector);
                getNewCardSection().addItem(newCard.generateCard());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(popupAddCard, false);
            });
    }
);
addPopup.setEventListeners();

const updateAvatarPopup = new PopupWithForm(popupUpdateAvatar,
    (paramObj) => {
        renderLoading(popupUpdateAvatar, true);
        api.updateAvatar(paramObj)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .then((data) => {
                setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(popupUpdateAvatar, false);
            });
    }
);
updateAvatarPopup.setEventListeners();

function openAddCardPopup() {
    inputAddCardForm.reset();
    addFormValidator.resetState();
    addPopup.open();
}

function openUpdateAvatarPopup() {
    inputUpdateAvatardForm.reset();
    updateAvatarValidator.resetState();
    updateAvatarPopup.open();
}

editProfileButton.addEventListener('click', openEditProfilePopup);
addCardButton.addEventListener('click', openAddCardPopup);
updateAvatarButton.addEventListener('click', openUpdateAvatarPopup);