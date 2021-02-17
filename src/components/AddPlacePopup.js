import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCards(cardNameRef.current.value, cardLinkRef.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add"
      title="Новое место"
      btnName="Создать"
      children={
        <>
          <label className="popup-form__field">
            <input
              name="card-add"
              type="text"
              ref={cardNameRef}
              minLength="2"
              maxLength="30"
              placeholder="Название"
              id="card-title-input"
              className="popup-form__input popup-add__input_title"
              required
            />
            <span
              className="popup-form__input-error"
              id="card-title-input-error"
            ></span>
          </label>
          <label className="popup-form__field">
            <input
              name="card-add"
              type="url"
              ref={cardLinkRef}
              placeholder="Ссылка на картинку"
              id="card-url-input"
              className="popup-form__input popup-add__input_url"
              required
            />
            <span
              className="popup-form__input-error"
              id="card-url-input-error"
            ></span>
          </label>
        </>
      }
    />
  );
}

export default AddPlacePopup;
