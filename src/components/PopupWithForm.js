function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-form popup-${props.name} ${
        props.isOpen ? `popup_opened` : ``
      }`}
    >
      <form
        onSubmit={props.onSubmit}
        method="get"
        action="index.html"
        name={props.name}
        className="popup-form__container popup-edit__container"
        noValidate
      >
        <button
          type="reset"
          className={`popup__reset popup-${props.name}__reset`}
          onClick={props.onClose}
        ></button>
        <h2 className="popup-form__header">{props.title}</h2>
        {props.children}
        <button type="submit" className="popup-form__submit">
          {props.btnName}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
