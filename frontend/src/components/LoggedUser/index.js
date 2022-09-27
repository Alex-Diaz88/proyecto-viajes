import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";
import DefaultAvatar from "../../assets/images/defaultAvatar.png";

const LoggedUser = () => {
  const { loggedUser } = useTokenContext();

  const avatar = loggedUser.avatar
    ? `${process.env.REACT_APP_API_URL}/avatars/${loggedUser?.avatar}`
    : DefaultAvatar;

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <section className="header_profile">
      <img src={avatar} alt={"userAvatar"} />
      <div>
        <p>¡Bienvenido/a, {loggedUser?.username}!</p>
        <ul>
          <li onClick={() => logOut()}>Cerrar sesión</li>
          <li
            onClick={() => {
              navigate(`/profile/${loggedUser?.id}`);
            }}
          >
            Mi cuenta
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LoggedUser;
