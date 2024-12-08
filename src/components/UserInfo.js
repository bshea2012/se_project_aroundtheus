export default class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._nameElement = document.querySelector(profileName);
    this._jobElement = document.querySelector(profileDescription);
    this._avatarElement = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      src: this._avatarElement.src,
    };
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }

  setUserAvatar(src) {
    this._avatarElement.src = src;
  }
}
