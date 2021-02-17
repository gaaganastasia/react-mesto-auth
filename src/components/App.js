import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import authApi from "../utils/authApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      authApi
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);


  function handleLogin(email, password) {
    authApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleSignUp(email, password) {
    authApi
      .register(email, password)
      .then((res) => {
        if (res.data) {
          history.push("/sign-in");
          handleIsTooltipOpen(true);
        } else {
          handleIsTooltipOpen(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
  const handleIsTooltipOpen = (successRegister) => {
    setIsTooltipOpen(!isTooltipOpen);
    setIsRegisterSuccess(successRegister);
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const handleCardClick = (card) => setSelectedCard(card);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(undefined);
    setIsTooltipOpen(false);
  };

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(data) {
    api
      .setProfileInfo(data.name, data.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setProfileAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .createNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          onSignOut={handleLogout}
          history={history}
        />

        <Switch>
          <Route path="/sign-up">
            <Register
              history={history}
              handleIsTooltipOpen={handleIsTooltipOpen}
              onRegister={handleSignUp}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              loggedIn={loggedIn}
              onLogin={handleLogin}
              tokenCheck={tokenCheck}
              history={history}
            />
          </Route>

          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            userEmail={userEmail}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={(card) => handleCardLike(card)}
            onCardDelete={(card) => handleCardDelete(card)}
          ></ProtectedRoute>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip
          isRegisterSuccess={isRegisterSuccess}
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm name="delete" title="Вы уверены?" btnName="Да" />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
