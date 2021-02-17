import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit"
      title="Редактировать профиль"
      btnName="Сохранить"
      children={
        <>
          <label className="popup-form__field">
            <input
              name="profile-change"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              value={name}
              onChange={handleChangeName}
              id="profile-name-input"
              className="popup-form__input popup-edit__input_name"
              required
            />
            <span
              className="popup-form__input-error"
              id="profile-name-input-error"
            ></span>
          </label>
          <label className="popup-form__field">
            <input
              name="profile-change"
              type="text"
              minLength="2"
              maxLength="200"
              placeholder="Профессия"
              value={description}
              onChange={handleChangeDescription}
              id="profile-job-input"
              className="popup-form__input popup-edit__input_job"
              required
            />
            <span
              className="popup-form__input-error"
              id="profile-job-input-error"
            ></span>
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
