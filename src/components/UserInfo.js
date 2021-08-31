export default class UserInfo {
  constructor({profileNameElementSelector, profileAboutElementSelector, profileAvatarSelector}) {
    this._profileNameElement = document.querySelector(profileNameElementSelector);
    this._profileAboutElement = document.querySelector(profileAboutElementSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);

  }

  //получаем данные пользователя и возвращаем объект
  getUserInfo() {
    const userData = ({
      username: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent,
      avatar: this._profileAvatar.src});
    return userData;
  }

  //устанавливаем данные пользователя в профиль
  setUserInfo(userData) {
      this._profileNameElement.textContent = userData.name;
      this._profileAboutElement.textContent = userData.about;
      this._profileAvatar.src = userData.avatar;
  }
}
