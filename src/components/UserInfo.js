export default class UserInfo {
  constructor({profileNameElementSelector, profileAboutElementSelector, profileNameInputNameAttribute, profileAboutInputNameAttribute}) {
    this._profileNameElement = document.querySelector(profileNameElementSelector);
    this._profileAboutElement = document.querySelector(profileAboutElementSelector);
    this._profileNameInputName = profileNameInputNameAttribute;
    this._profileAboutInputName = profileAboutInputNameAttribute;

  }

  getUserInfo() {
    const userData = ({
      'profile-name': this._profileNameElement.textContent,
      'profile-about': this._profileAboutElement.textContent});
    return userData;
  }

  setUserInfo(inputValuesData) {
    this._profileNameElement.textContent = inputValuesData[this._profileNameInputName];
    this._profileAboutElement.textContent = inputValuesData[this._profileAboutInputName];
  }
}
