import React from "react";
import { Link, withRouter } from "react-router-dom";

const Register = (props) => {
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
    props.onRegister(email, password);
  }

  return (
    <div className="form__container">
      <h1 className="form__header">Регистрация</h1>
      <form
        method="post"
        action="index.html"
        name="sign-in"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="form__field" htmlFor="email-input">
          <input
            name="sign-in"
            type="text"
            minLength="2"
            maxLength="30"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            id="email-input"
            className="form__input form__input-email"
          ></input>
          <span className="form__input-error" id="email-input-error"></span>
        </label>
        <label className="form__field" htmlFor="password-input">
          <input
            name="sign-in"
            type="password"
            minLength="8"
            maxLength="30"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
            id="password-input"
            className="form__input form__input-password"
          ></input>
          <span className="form__input-error" id="password-input-error"></span>
        </label>
        <button type="submit" className="form__submit">
          Зарегистрироваться
        </button>
        <p className="form__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="form__link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(Register);
