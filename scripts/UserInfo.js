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

    setUserInfo(name, about) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }
}