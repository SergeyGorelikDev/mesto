import { openPopup, closePopup, closePopupHandler, pressEscHandler } from './utils.js'
const popupImageViewer = document.querySelector('.popup_image_viewer');

export class Card {
    constructor(link, name, templateSelector) {
        this._link = link;
        this._name = name;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardTemplate;
    }

    _setElementAttr(elemConfig) {
        const imageItem = elemConfig.element.querySelector(elemConfig.photo);
        imageItem.setAttribute('src', this._link);
        imageItem.setAttribute('alt', this._name);
        elemConfig.element.querySelector(elemConfig.title).textContent = this._name;
    }

    _likeCardHandler(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deleteCardHandler(evt) {
        evt.target.closest('.element').remove();
    }

    _openImageViewerPopup() {
        const elemConfig = {
            element: popupImageViewer,
            photo: '.popup__photo',
            title: '.popup__header'
        };
        this._setElementAttr(elemConfig);
        openPopup(popupImageViewer);
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeCardHandler(evt);
        });

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._deleteCardHandler(evt);
        });

        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._openImageViewerPopup();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const elemConfig = {
            element: this._element,
            photo: '.element__photo',
            title: '.element__title'
        };
        this._setElementAttr(elemConfig);
        this._setEventListeners();
        return this._element;
    }
}