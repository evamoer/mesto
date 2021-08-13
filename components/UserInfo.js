export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const profileNameContent = this._profileNameElement.textContent;
    const profileAboutContent = this._profileAboutElement.textContent;
    const userData = ({"profile-name": profileNameContent, "profile-about": profileAboutContent});
    console.log(userData);
    return userData;
  }

  setUserInfo(formValues) {
    this._profileNameElement.textContent = formValues["profile-name"];
    this._profileAboutElement.textContent = formValues["profile-about"];
  }
}
