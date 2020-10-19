import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleCardClick }) {
        super(popupSelector);
        this._inputForm = document.forms.confirm;
        this._handleCardClick = handleCardClick;
    }

    setEventListeners() {
        this._inputForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._delete(this.image);
        });
    }

    chooseFunc(evt) {
        this._delete = this._handleCardClick;
        this.image = evt;
    }

}