import headerLogo from "../images/logo.svg";
import React from "react";
import { Route, Link } from "react-router-dom";

function Header(props) {
  function signOut() {
    props.onSignOut();
    localStorage.removeItem("jwt");
    props.history.push("/sign-in");
  }

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <Route exact path="/">
        <p className="header__info">
          {props.userEmail}
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выйти
          </Link>
        </p>
      </Route>

      <Route path="/sign-up">
        <p className="header__info">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </p>
      </Route>

      <Route path="/sign-in">
        <p className="header__info">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </p>
      </Route>
    </header>
  );
}

export default Header;
