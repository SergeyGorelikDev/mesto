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

    _setImageAttr() {
        const imageItem = this._element.querySelector('img');
        imageItem.setAttribute('src', this._link);
        imageItem.setAttribute('alt', this._name);
        this._element.querySelector('h2').textContent = this._name;
    }

    _likeCardHandler(evt) {
        if (evt.target.classList.contains('element__like')) {
            evt.target.classList.toggle('element__like_active');
        }
    }

    _deleteCardHandler(evt) {
        if (evt.target.classList.contains('element__delete')) {
            evt.target.closest('.element').remove();
        }
    }
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._likeCardHandler(evt);
        });

        this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
            this._deleteCardHandler(evt);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setImageAttr();
        this._setEventListeners();
        return this._element;
    }
}