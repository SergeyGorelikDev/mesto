import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
    }
    _getInputValues(evt) {
        evt.preventDefault();
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        const name = inputList[0].value;
        const link = inputList[1].value;
        this._submitForm(name, link);
        this.close();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__input-form').addEventListener('submit', (evt) => {
            this._getInputValues(evt);
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__input-form').reset();
    }
}