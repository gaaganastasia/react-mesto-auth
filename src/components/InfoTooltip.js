import tooltipImg from "../images/Union.svg";
import errTooltipImg from "../images/Union-err.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup-form ${props.isOpen ? `popup_opened` : ``}`}>
      <form
        method="get"
        action="index.html"
        className="tooltip__container"
        noValidate
      >
        <button
          type="reset"
          className="popup__reset"
          onClick={props.onClose}
        ></button>
        <img
          className="tooltip__img"
          src={props.isRegisterSuccess ? tooltipImg : errTooltipImg}
          alt={props.isRegisterSuccess ? `регистрация прошла успешно` : `ошибка регистрации`}
        ></img>
        <h2 className="tooltip__text">{`${
          props.isRegisterSuccess
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`
        }`}</h2>
      </form>
    </div>
  );
}

export default InfoTooltip;
