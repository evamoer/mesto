export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector, profileNameInputNameAttribute, profileAboutInputNameAttribute) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
    this._profileNameInputName = profileNameInputNameAttribute;
    this._profileAboutInputName = profileAboutInputNameAttribute;
  }

  getUserInfo() {
    const userData = ({
      profileNameInputName: this._profileNameElement.textContent,
      profileAboutInputName: this._profileAboutElement.textContent});
    return userData;
  }

  setUserInfo(formValues) {
    this._profileNameElement.textContent = formValues[this._profileNameInputName];
    this._profileAboutElement.textContent = formValues[this._profileAboutInputName];
  }
}
