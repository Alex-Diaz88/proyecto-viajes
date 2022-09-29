import "./styles.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";
import { useState } from "react";
import ButtonCheck from "../ButtonCheck";

const Travel = ({ travel }) => {
  const [viewMore, setViewMore] = useState(false);

  const { title, entry, place, activity, content, createdAt, idUser, photos, username, avatar, votes, id } = travel;

  return (
    <article className="travel">
    
      {avatar !== undefined && username && (
        <section className="travel_user_info">
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


          </section>
          <section className="user_profile">
          <Link to={`/users/${idUser}`}>
            <Avatar className="avatar" avatar={avatar} username={username} />
          </Link>
          <Link to={`/users/${idUser}`}>
            <p>Subido por {username}</p>
          </Link>
          <p>{createdAt.split("T")[0]}</p>
</section>
          <span hidden={!viewMore}>
            <p>{content}</p>
          </span>
          <button onClick={() => setViewMore(!viewMore)}>{viewMore ? "Leer menos" : "Leer más"}</button>
        </section>
      )}
      
      {photos.length > 0 && <PhotoSlider photos={photos} travelName={title} />}
      <ButtonCheck idTravel={id} />    
    </article>
  );
};

export default Travel;
