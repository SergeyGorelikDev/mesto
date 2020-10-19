import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageItem = this._popup.querySelector('.popup__photo');
        this._header = this._popup.querySelector('.popup__header');
    }
    open(link, name) {
        this._imageItem.setAttribute('src', link);
        this._imageItem.setAttribute('alt', name);
        this._header.textContent = name;
        super.open();
    }
}