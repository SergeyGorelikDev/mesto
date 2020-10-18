import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._inputForm = this._popup.querySelector('.popup__input-form');
    }
    _getInputValues() {
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
        this._formValues = {};
        this._inputList.forEach((input, index) => {
            this._formValues[input.name] = input.value
        });
        return this._formValues;
    }

    setEventListeners() {
        this._inputForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const paramObj = this._getInputValues();
            this._submitForm(paramObj);
            this.close();
        });
    }

    close() {
        super.close();
        this._inputForm.reset();
    }
}