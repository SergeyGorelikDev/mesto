export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClose(evt) {
        const classSet = evt.target.classList;
        if (classSet.contains('popup_opened') || classSet.contains('popup__close-button')) {
            this.close();
        }
    }

    _setEventListeners() {
        this._clickHandler = this._handleClose.bind(this);
        this._keydownHandler = this._handleEscClose.bind(this);
        this._popup.addEventListener('click', this._clickHandler);
        document.addEventListener('keydown', this._keydownHandler);
    }

    _deleteEventListeners() {
        this._popup.removeEventListener('click', this._clickHandler);
        document.removeEventListener('keydown', this._keydownHandler);
    }

    open() {
        this._setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._deleteEventListeners();
        this._popup.classList.remove('popup_opened');
    }
}