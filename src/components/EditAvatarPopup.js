import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="edit-avatar"
      title="Обновить аватар"
      btnName="Сохранить"
      children={
        <>
          <label className="popup-form__field">
            <input
              name="profile-avatar-change"
              type="url"
              ref={avatarRef}
              placeholder="Ссылка"
              id="url-input"
              className="popup-form__input popup-edit-avatar__input"
              required
            />
            <span
              className="popup-form__input-error"
              id="url-input-error"
            ></span>
          </label>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
