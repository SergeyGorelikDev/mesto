export class Api {
    constructor(options) {
        // тело конструктора
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getInformation() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
                headers: {
                    authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getAllNeededData() {
        return Promise.all([this.getInformation(), this.getInitialCards()]);
    }

    updateInformation({ name, about }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    updateAvatar({ avatar }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        });
    }

    postPhoto({ name, link }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
            method: 'POST',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
    }

    deletePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            }
        });
    }

    likePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            }
        });
    }

    unlikePhoto(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/${id}`, {
            method: 'delete',
            headers: {
                authorization: '5e28b23d-e13c-4018-b0b3-86a78e78d1a4',
                'Content-Type': 'application/json'
            }
        });
    }
}