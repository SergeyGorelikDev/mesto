export class Card {
    constructor(name, link, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = '#element-template';
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardTemplate;
    }

    _likeCardHandler(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _deleteCardHandler(evt) {
        evt.target.closest('.element').remove();
    }

    _setElementAttr(elemConfig) {
        const imageItem = this._element.querySelector(elemConfig.photo);
        imageItem.setAttribute('src', this._link);
        imageItem.setAttribute('alt', this._name);
        this._element.querySelector(elemConfig.title).textContent = this._name;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeCardHandler(evt);
        });

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._deleteCardHandler(evt);
        });
        this._element.querySelector('.element__photo').addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        });
    }
    generateCard() {
        this._element = this._getTemplate();
        const elemConfig = {
            photo: '.element__photo',
            title: '.element__title'
        };
        this._setElementAttr(elemConfig);
        this._setEventListeners();
        return this._element;
    }
}