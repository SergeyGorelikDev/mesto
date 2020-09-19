const container = document.querySelector('.page');
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closePopupHandler);
    container.addEventListener('keydown', pressEscHandler);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closePopupHandler);
    container.removeEventListener('keydown', pressEscHandler);
}

export function closePopupHandler(evt) {
    const classSet = evt.target.classList;
    if (classSet.contains('popup_opened') || classSet.contains('popup__close-button') || classSet.contains('popup__submit-button')) {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    }
}

export function pressEscHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = evt.currentTarget.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}