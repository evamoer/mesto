(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a){var l=o.cardTemplateSelector,u=o.cardElementSelector,c=o.deleteCardButtonSelector,s=o.likeCardButtonSelector,f=o.activeLikeButtonClass,p=o.cardImageContainerSelector,d=o.cardImageSelector,h=o.cardTitleSelector,_=o.cardLikeNumberSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._item=e,this._userId=n,this._api=r,this._cardTemplateSelector=l,this._cardElementSelector=u,this._deleteCardButtonSelector=c,this._likeCardButtonSelector=s,this._activeLikeButtonClass=f,this._cardImageContainerSelector=p,this._cardImageSelector=d,this._cardTitleSelector=h,this._cardLikeNumberSelector=_,this._handleFullImage=i,this._handleDeleteCard=a}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(this._cardElementSelector).cloneNode(!0)}},{key:"_deleteCard",value:function(){var e=this;this._handleDeleteCard(this._item._id).then((function(){return e._element.remove()})).catch((function(e){return console.log("Ошибка: ".concat(e))}))}},{key:"_renderDeleteIcon",value:function(){this._item.owner._id!==this._userId&&(this._element.querySelector(this._deleteCardButtonSelector).style.visibility="hidden")}},{key:"_renderLike",value:function(e){var t=this._element.querySelector(this._cardLikeNumberSelector),n=this._element.querySelector(this._likeCardButtonSelector);t.textContent=e.likes.length,this._isLiked(e.likes)?n.classList.add(this._activeLikeButtonClass):n.classList.remove(this._activeLikeButtonClass)}},{key:"_isLiked",value:function(e){var t=this;return e.some((function(e){return e._id===t._userId}))}},{key:"_handleLikeClick",value:function(){var e=this,t=this._isLiked(this._item.likes);this._api.likeCard(this._item._id,t).then((function(t){e._renderLike(t),e._item.likes=t.likes})).catch((function(e){return console.log("Ошибка: ".concat(e))}))}},{key:"_setEventListeners",value:function(){var e=this,t=this._element.querySelector(this._deleteCardButtonSelector),n=this._element.querySelector(this._likeCardButtonSelector);this._element.querySelector(this._cardImageContainerSelector).addEventListener("click",(function(t){return e._handleFullImage({name:t.target.alt,link:t.target.src})})),t.addEventListener("click",(function(){return e._deleteCard()})),n.addEventListener("click",(function(){return e._handleLikeClick()}))}},{key:"generateCard",value:function(){this._element=this._getTemplate();var e=this._element.querySelector(this._cardImageSelector),t=this._element.querySelector(this._cardTitleSelector);return e.src=this._item.link,e.alt=this._item.name,t.textContent=this._item.name,this._renderDeleteIcon(),this._renderLike(this._item),this._setEventListeners(),this._element}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){var r=t.inactiveButtonClass,o=t.inputErrorClass,i=t.errorClass,a=t.submitButtonSelector,l=t.inputSelector,u=t.closeButtonSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=document.getElementById(n),this._inactiveButtonClass=r,this._inputErrorClass=o,this._errorClass=i,this._submitButtonElement=this._formElement.querySelector(a),this._inputList=Array.from(this._formElement.querySelectorAll(l)),this._closeButtonElement=this._formElement.closest(".popup__container").querySelector(u)}var t,r;return t=e,(r=[{key:"_defineErrorElement",value:function(e){return this._errorElement=this._formElement.querySelector("#".concat(e.name,"-input-error")),this._errorElement}},{key:"_hideInputError",value:function(e,t){(t=this._defineErrorElement(e)).textContent="",t.classList.remove(this._errorClass)}},{key:"_showInputError",value:function(e,t){(t=this._defineErrorElement(e)).textContent=e.validationMessage,t.classList.add(this._errorClass)}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"toggleSubmitButtonState",value:function(){this._hasInvalidInput()?(this._submitButtonElement.setAttribute("disabled",!0),this._submitButtonElement.classList.add(this._inactiveButtonClass)):(this._submitButtonElement.removeAttribute("disabled",!1),this._submitButtonElement.classList.remove(this._inactiveButtonClass))}},{key:"_toggleInputState",value:function(e){e.validity.valid?(e.classList.remove(this._inputErrorClass),this._hideInputError(e)):(e.classList.add(this._inputErrorClass),this._showInputError(e))}},{key:"cleanInputError",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t),t.classList.remove(e._inputErrorClass)}))}},{key:"_setEventListeners",value:function(){var e=this;this._formElement.addEventListener("submit",(function(e){return e.preventDefault()})),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._toggleInputState(t),e.toggleSubmitButtonState()}))})),this.toggleSubmitButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=n.containerSelector,o=n.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._api=t,this._container=document.querySelector(r),this._renderer=o}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e,t){var n=this;e.reverse().forEach((function(e){var r=n._renderer(e,t);n.addItem(r)}))}}])&&o(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._closeButtonElement=this._popupElement.querySelector(".button_type_close"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"handleOverlayClick",value:function(e){e.target===e.currentTarget&&this.close()}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){this._closeButtonElement.addEventListener("click",this.close.bind(this)),this._popupElement.addEventListener("mousedown",this.handleOverlayClick.bind(this))}}])&&a(t.prototype,n),e}();function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return(s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=d(r);if(o){var n=d(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return p(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._fullImageElement=t._popupElement.querySelector(".popup__full-image"),t._fullImageCaption=t._popupElement.querySelector(".popup__full-image-caption"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;s(d(a.prototype),"open",this).call(this),this._fullImageElement.src=n,this._fullImageElement.alt=t,this._fullImageCaption.textContent=t}}])&&c(t.prototype,n),a}(l);function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t,n){return(y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return b(this,e)});function a(e){var t,n=e.popupSelector,r=e.formValidator,o=e.handleFormSubmit,l=e.submitButtonLabel;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._formValidator=r,t._handleFormSubmit=o,t._formElement=t._popupElement.querySelector(".popup__form"),t._submitButtonElement=t._formElement.querySelector(".button_type_submit"),t._inputList=t._formElement.querySelectorAll(".popup__input"),t._submitButtonLabel=l,t}return t=a,(n=[{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.id]}))}},{key:"_getInputValues",value:function(){var e={};return this._inputList.forEach((function(t){e[t.id]=t.value})),e}},{key:"setEventListeners",value:function(){var e=this;y(E(a.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(t){e._handleFormSubmit(t,e._getInputValues()),e.close()}))}},{key:"open",value:function(){this._formValidator.cleanInputError(),this._formValidator.toggleSubmitButtonState(),y(E(a.prototype),"open",this).call(this)}},{key:"close",value:function(){y(E(a.prototype),"close",this).call(this),this._formElement.reset()}},{key:"renderLoading",value:function(e){this._submitButtonElement.textContent=e?"Сохранение...":this._submitButtonLabel}}])&&m(t.prototype,n),a}(l);function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var k=function(){function e(t){var n=t.profileNameElementSelector,r=t.profileAboutElementSelector,o=t.profileAvatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileNameElement=document.querySelector(n),this._profileAboutElement=document.querySelector(r),this._profileAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{username:this._profileNameElement.textContent,about:this._profileAboutElement.textContent,avatar:this._profileAvatar.src}}},{key:"setUserInfo",value:function(e){this._profileNameElement.textContent=e.name,this._profileAboutElement.textContent=e.about,this._profileAvatar.src=e.avatar}}])&&g(t.prototype,n),e}();function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=n,this._headers=r}var t,n;return t=e,(n=[{key:"_responseHandler",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._responseHandler)}},{key:"getUserData",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._responseHandler(t)}))}},{key:"updateUserData",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.username,about:e.about})}).then((function(e){return t._responseHandler(e)}))}},{key:"addCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return t._responseHandler(e)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._responseHandler(e)}))}},{key:"likeCard",value:function(e,t){var n=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:t?"DELETE":"PUT",headers:this._headers}).then((function(e){return n._responseHandler(e)}))}},{key:"updateAvatar",value:function(e){var t=this,n=e.avatar;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:n})}).then((function(e){return t._responseHandler(e)}))}}])&&C(t.prototype,n),e}(),w={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",openButtonSelector:".button_type_open",closeButtonSelector:".button_type_close",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},I={cardTemplateSelector:".gallery-item-template",cardElementSelector:".gallery-table__item",deleteCardButtonSelector:".button_type_delete-card",likeCardButtonSelector:".button_type_like",activeLikeButtonClass:"button_type_like-active",cardImageContainerSelector:".card__image-container",cardImageSelector:".card__image",cardTitleSelector:".card__title",cardLikeNumberSelector:".card__like-number"};function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var O,j=document.querySelector(".button_type_edit"),T=document.querySelector(".button_type_add"),P=document.querySelector(".profile__avatar-container"),q=new r(w,"popup__edit-profile-form"),A=new r(w,"popup__add-card-form"),U=new r(w,"popup__delete-card-form"),D=new r(w,"popup__edit-avatar-form"),R=new h(".popup_type_full-image"),V=new k({profileNameElementSelector:".profile__name",profileAboutElementSelector:".profile__about",profileAvatarSelector:".profile__avatar"}),x=new L({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-27",headers:{authorization:"8db06075-d4ea-471e-8c36-db2b91e349e8","Content-Type":"application/json"}}),N=function(e){return R.open(e)},H=function(e){return G.open(),new Promise((function(t,n){document.getElementById("popup__delete-card-form").onsubmit=function(){return t(x.deleteCard(e))}}))},F=function(e){return new t(e,O,x,I,N,H).generateCard()},J=new i(x,{containerSelector:".gallery-table",renderer:F});Promise.all([x.getCards(),x.getUserData()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,l=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];O=i._id,J.renderItems(o,O),V.setUserInfo(i)})).catch((function(e){return console.log("Ошибка: ".concat(e))}));var M=new S({popupSelector:".popup_type_edit-profile",formValidator:q,handleFormSubmit:function(e,t){e.preventDefault(),M.renderLoading(!0),x.updateUserData(t).then((function(e){return V.setUserInfo(e)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){return M.renderLoading(!1)}))},submitButtonLabel:"Сохранить"}),z=new S({popupSelector:".popup_type_add-card",formValidator:A,handleFormSubmit:function(e,t){e.preventDefault(),z.renderLoading(!0),x.addCard(t).then((function(e){var t=F(e);J.addItem(t)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){return z.renderLoading(!1)}))},submitButtonLabel:"Создать"}),$=new S({popupSelector:".popup_type_edit-avatar",formValidator:D,handleFormSubmit:function(e,t){e.preventDefault(),$.renderLoading(!0),x.updateAvatar(t).then((function(e){return V.setUserInfo(e)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){return $.renderLoading(!1)}))},submitButtonLabel:"Сохранить"}),G=new S({popupSelector:".popup_type_delete-card",formValidator:U,handleFormSubmit:function(e){return e.preventDefault()}});j.addEventListener("click",(function(){var e=V.getUserInfo();M.setInputValues(e),M.open()})),T.addEventListener("click",(function(){return z.open()})),P.addEventListener("click",(function(){return $.open()})),z.setEventListeners(),M.setEventListeners(),R.setEventListeners(),G.setEventListeners(),$.setEventListeners(),q.enableValidation(),A.enableValidation(),D.enableValidation()})();