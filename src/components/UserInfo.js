export default class UserInfo {
  constructor({profileNameElementSelector, profileAboutElementSelector}) {
    this._profileNameElement = document.querySelector(profileNameElementSelector);
    this._profileAboutElement = document.querySelector(profileAboutElementSelector);
  }

  //получаем данные пользователя и возвращаем объект
  getUserInfo() {
    const userData = ({
      profileName: this._profileNameElement.textContent,
      profileAbout: this._profileAboutElement.textContent});
    return userData;
  }

  //устанавливаем данные пользователя в профиль
  setUserInfo(userData) {
      this._profileNameElement.textContent = userData.name;
      this._profileAboutElement.textContent = userData.about;
  }
}
