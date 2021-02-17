import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteBtnClassName = `element__delete ${
    isOwn ? "element__delete_shown" : ""
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeBtnClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  return (
    <div className="elements__element element">
      <img
        src={props.card.link}
        alt={`Фото ${props.card.name}`}
        className="element__image"
        onClick={props.onCardClick}
      />
      <button
        type="button"
        className={cardDeleteBtnClassName}
        onClick={props.onCardDelete}
      ></button>
      <h3 className="element__title">{props.card.name}</h3>
      <div className="element__like-container">
        <button
          type="button"
          className={cardLikeBtnClassName}
          onClick={props.onCardLike}
        ></button>
        <p className="element__like-counter">{props.card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
