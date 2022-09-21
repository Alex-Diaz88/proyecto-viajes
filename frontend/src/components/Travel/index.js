import "./styles.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";

const Travel = ({ travel }) => {
  const { title, entry, place, activity, content, createdAt, idUser, photos, username, avatar } = travel;

  return (
    <article className="travel">
      {avatar !== undefined && username && (
        <section className="travel_user_info">
          <Link to={`/users/${idUser}`}>
            <Avatar avatar={avatar} username={username} />
          </Link>

          <Link to={`/users/${idUser}`}>
            <p>Subido por {username}</p>
          </Link>
        </section>
      )}

      <section className="travel_info">
        <h3>{title}</h3>
        <p>{entry}</p>
        <p>{content}</p>
        <p>{place}</p>
        <p>{activity}</p>

        {photos.length > 0 && <PhotoSlider photos={photos} travelName={title} />}
        <p>{createdAt.split("T")[0]}</p>
      </section>
    </article>
  );
};

export default Travel;
