import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";
import { useState } from "react";
import ButtonCheck from "../ButtonCheck";
import DeleteTravel from "../DeleteTravel";
import NewCommentForm from "../NewCommnetForm";
import CommentList from "../CommentList";

const Travel = ({ travel, addComment }) => {
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
    comments,
  } = travel;

  return (
    <article className="travel">
      <div className="travel-header">
        <h3>{title}</h3>
      </div>
      <div className="travel-container">
        <div>
          <p>
            <span>Localización </span>
            {place}
          </p>
          <p>
            <span>Tipo de actividad </span>
            {activity}
          </p>
          <p>
            <span>votos </span>
            {votes}
          </p>
          <ButtonCheck idTravel={id} />
          <p>{createdAt.split("T")[0]}</p>
          <DeleteTravel idUser={id} />
          <Link to={`/users/${idUser}`}>
            <Avatar className="avatar" avatar={avatar} username={username} />
          </Link>
          <Link to={`/users/${idUser}`}>
            <p>Subido por {username}</p>
          </Link>
        </div>
        <div>
          {photos.length > 0 && (
            <PhotoSlider photos={photos} travelName={title} />
          )}
        </div>
      </div>
      <div>
        <p>{entry}</p>
        <span hidden={!viewMore}>
          <p>{content}</p>
          {addComment && (
            <NewCommentForm idTravel={id} addComment={addComment} />
          )}
          <CommentList comments={comments} />
        </span>
        <div className="travel-viewMore">
          <button onClick={() => setViewMore(!viewMore)}>
            {viewMore ? "Leer menos" : "Leer más"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Travel;
