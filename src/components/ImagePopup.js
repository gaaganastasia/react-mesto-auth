function ImagePopup(props) {
  return (
    <div
      className={`popup popup-img popup-${props.name} ${
        props.card && `popup_opened`
      }`}
    >
      <div className="popup-img__container">
        <button
          type="reset"
          className="popup__reset popup-img__reset"
          onClick={props.onClose}
        ></button>
        <figure className="popup-img__figure">
          <img
            src={props.card && props.card.link}
            alt={props.card && `Фото ${props.card.name}`}
            className="popup-img__image"
          />
          <figcaption className="popup-img__caption">
            {props.card && props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
