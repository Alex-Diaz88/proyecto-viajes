import "./styles.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";
import { useState } from "react";
import ButtonCheck from "../ButtonCheck";
import DeleteTravel from "../DeleteTravel";

const Travel = ({ travel }) => {
  const [viewMore, setViewMore] = useState(false);

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
    id,
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
        <DeleteTravel idUser={id} />
        <span hidden={!viewMore}>
          <p>{content}</p>
        </span>

        <ButtonCheck idTravel={id} />

        <button onClick={() => setViewMore(!viewMore)}>
          {viewMore ? "Leer menos" : "Leer más"}
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
