class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: String(email),
        password: String(password),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
}

const authApi = new Api({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default authApi;
