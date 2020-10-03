import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(link, name) {
        const elemConfig = {
            element: this._popup,
            photo: '.popup__photo',
            title: '.popup__header'
        };
        const imageItem = elemConfig.element.querySelector(elemConfig.photo);
        imageItem.setAttribute('src', link);
        imageItem.setAttribute('alt', name);
        elemConfig.element.querySelector(elemConfig.title).textContent = name;
        super.open();
    }
}