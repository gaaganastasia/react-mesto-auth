import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__form">
          <div
            className="profile__image-container"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__image"
            />
            <div className="profile__image-overlay"></div>
          </div>
          <div className="profile__info info">
            <h1 className="info__title">{currentUser.name}</h1>
            <button
              type="button"
              className="info__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <p className="info__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={() => props.onCardClick(card)}
            onCardLike={() => props.onCardLike(card)}
            onCardDelete={() => props.onCardDelete(card)}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
