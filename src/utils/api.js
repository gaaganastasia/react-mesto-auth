const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleError = (err) => {
  console.log(err);
};

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      //карточки
      method: "GET",
      headers: this._headers,
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  setProfileInfo(userName, userInfo) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userInfo,
      }),
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  setProfileAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  createNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(handleOriginalResponse)
      .catch(handleError);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      })
        .then(handleOriginalResponse)
        .catch(handleError);
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(handleOriginalResponse)
        .catch(handleError);
    }
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "0f98b9d9-de6c-47c4-8011-fc8d2aa2d9ac",
    "Content-Type": "application/json",
  },
});

export default api;
