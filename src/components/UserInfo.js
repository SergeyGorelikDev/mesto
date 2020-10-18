export class UserInfo {
    constructor(profileName, profileAbout, profileAvatar) {
        this._profileName = document.querySelector(profileName);
        this._profileAbout = document.querySelector(profileAbout);
        this._profileAvatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            "name": this._profileName.textContent,
            "about": this._profileAbout.textContent,
            "avatar": this._profileAvatar.src
        }
    }

    setUserInfo({ name, about, avatar }) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
        this._profileAvatar.src = avatar;
    }
}