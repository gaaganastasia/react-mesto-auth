import React from "react";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  return (
    <div className="form__container">
      <h1 className="form__header">Вход</h1>
      <form
        method="post"
        action="index.html"
        name="sign-in"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="form__field" htmlFor="email">
          <input
            name="email"
            type="text"
            minLength="2"
            maxLength="30"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            id="email"
            className="form__input form__input-email"
            required
          ></input>
          <span className="form__input-error" id="email-input-error"></span>
        </label>
        <label className="form__field" htmlFor="password">
          <input
            name="password"
            type="password"
            minLength="8"
            maxLength="30"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
            id="password"
            className="form__input form__input-password"
            required
          ></input>
          <span className="form__input-error" id="password-input-error"></span>
        </label>
        <button type="submit" className="form__submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default withRouter(Login);
