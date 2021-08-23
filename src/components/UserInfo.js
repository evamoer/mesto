export default class UserInfo {
  constructor({profileNameElementSelector, profileAboutElementSelector, profileNameInputNameAttribute, profileAboutInputNameAttribute}) {
    this._profileNameElement = document.querySelector(profileNameElementSelector);
    this._profileAboutElement = document.querySelector(profileAboutElementSelector);
    this._profileNameInputName = profileNameInputNameAttribute;
    this._profileAboutInputName = profileAboutInputNameAttribute;

  }

  getUserInfo() {
    const userData = ({
      profileName: this._profileNameElement.textContent,
      profileAbout: this._profileAboutElement.textContent});
    return userData;
  }

  setUserInfo(inputValuesData) {
      this._profileNameElement.textContent = inputValuesData.name;
      this._profileAboutElement.textContent = inputValuesData.about;
  }
}
