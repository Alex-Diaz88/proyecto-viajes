import "./styles.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";

const Travel = ({ travel }) => {
  const {
    title,
    entry,
    place,
    activity,
    createdAt,
    idUser,
    photos,
    username,
    avatar,
  } = travel;

  return (
    <article className="travel">
      <section className="travel_info">
        <h3>{title}</h3>
        <p>{entry}</p>
        <p>Localización - {place}</p>
        <p>Tipo de actividad - {activity}</p>

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
