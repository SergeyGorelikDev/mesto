import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputForm = this._popup.querySelector('.popup__input-form');
    }
    _getInputValues() {
        const inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        const paramObj = {
            "param1": inputList[0].value,
            "param2": inputList[1].value
        };
        return paramObj;
    }

    setEventListeners() {
        this._inputForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const paramObj = this._getInputValues();
            this._submitForm(paramObj);
            this.close();
        });
        super._setEventListeners();
    }

    close() {
        super.close();
        this._inputForm.reset();
    }
}