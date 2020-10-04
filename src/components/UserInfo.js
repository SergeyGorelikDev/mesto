export class UserInfo {
    constructor(profileName, profileAbout) {
        this._profileName = document.querySelector(profileName);
        this._profileAbout = document.querySelector(profileAbout);
    }

    getUserInfo() {
        return {
            "name": this._profileName.textContent,
            "about": this._profileAbout.textContent
        }
    }

    setUserInfo({ param1, param2 }) {
        this._profileName.textContent = param1;
        this._profileAbout.textContent = param2;
    }
}