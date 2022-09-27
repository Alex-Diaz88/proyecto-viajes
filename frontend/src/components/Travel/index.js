import "./styles.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";

import Comment from "../Comment";

/* let hideTextButton = document.getElementById("hideTextButton");

let hideText = document.getElementById("hideText");

hideTextButton.addEventListener("click", toggleText);
function toggleText() {
  hideText.classList.toggle("show");

  if (hideText.classList.contains("show")) {
    hideTextButton.innerHTML = "Leer menos";
  } else {
    hideTextButton.innerHTML = "Leer mas";
  }
} */


const Travel = ({ travel }) => {
  const {
    title,
    entry,
    place,
    activity,
    content,
    createdAt,
    idUser,
    photos,
    username,
    avatar,
    votes,
  } = travel;

  return (
    <article className="travel">
      <section className="travel_info">
        <h3>{title}</h3>
        <p>{entry}</p>
        <p>{place}</p>
        <p>{activity}</p>
        <p>
          <span>votos: </span>
          {votes}
        </p>

        <p>Localización - {place}</p>
        <p>Tipo de actividad - {activity}</p>
        <span className="hide" id="hideText">
          <p>{content}</p>
          {/* <Comment /> */}
        </span>
        <button className="readMore" id="hideTextButton">
          Leer mas
        </button>

        {avatar !== undefined && username && (
          <section className="travel_user_info">
            <Link to={`/users/${idUser}`}>
              <Avatar className="avatar" avatar={avatar} username={username} />
            </Link>

            <Link to={`/users/${idUser}`}>
              <p>Subido por {username}</p>
            </Link>
            <p>{createdAt.split("T")[0]}</p>
          </section>
        )}


        {photos.length > 0 && (
          <PhotoSlider photos={photos} travelName={title} />
        )}
      </section>
    </article>
  );
};

export default Travel;
