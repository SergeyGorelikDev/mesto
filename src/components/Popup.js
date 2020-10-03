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

    setEventListeners() {
        const container = document.querySelector('.page');
        this._popup.addEventListener('click', (evt) => {
            this._handleClose(evt);
        });
        container.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }
}