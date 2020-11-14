export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._clickHandler = this._handleClose.bind(this);
        this._keydownHandler = this._handleEscClose.bind(this);
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

    setEventListeners() {
        alert(this._popup.classList);
        this._popup.addEventListener('click', this._clickHandler);
    }

    open() {
        document.addEventListener('keydown', this._keydownHandler);
        this._popup.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._keydownHandler);
        this._popup.classList.remove('popup_opened');
    }
}