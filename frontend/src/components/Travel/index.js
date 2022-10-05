import "./styles.css";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import PhotoSlider from "../PhotosSlider";
import { useState } from "react";
import ButtonCheck from "../ButtonCheck";
import NewCommentForm from "../NewCommentForm";
import CommentList from "../CommentList";
import verMas from "../../assets/icons/flecha-ampliar.png";
import verMenos from "../../assets/icons/flecha-contraer.png";

const Travel = ({ travel, addComment, addVote, deleteVote, btnComment }) => {
  const [viewMore, setViewMore] = useState(false);

  const { title, entry, place, activity, content, createdAt, idUser, photos, username, avatar, votes, id, comments } =
    travel;

  const modalRef = useRef();

  useEffect(() => {
    window.onclick = function (event) {
      console.log(event.target, modalRef.current);
      if (event.target === modalRef.current) {
        modalRef.current.style.display = "none";
      }
    };
  }, []);

  return (
    <article className="travel_container">
      <section className="travel_title">
        <h3>{title}</h3>
      </section>
      <section className="travel_info">
        <h4>{entry}</h4>
        <p>Lugar - {place}</p>
        <p>Actividad - {activity}</p>
        <p>
          <span>Votos - {votes} </span>
        </p>
      </section>
      <section className="likeB">
        <ButtonCheck idTravel={id} addVote={addVote} deleteVote={deleteVote} />
      </section>

      {avatar !== undefined && username && (
        <section className="travel_user_info">
          <Link to={`/profile/${idUser}`}>
            <Avatar className="avatar" avatar={avatar} username={username} />
          </Link>
          <Link to={`/profile/${idUser}`}>
            <p>Subido por {username}</p>
          </Link>
          <p>{createdAt.split("T")[0]}</p>
        </section>
      )}
      <section className="travel_slider">
        {photos.length > 0 && <PhotoSlider photos={photos} travelName={title} />}
      </section>
      <section className="travel_view">
        <img
          className="ver_mas_button"
          alt="Not Found"
          src={verMas}
          hidden={viewMore}
          onClick={() => setViewMore(!viewMore)}
        />
        <img
          className="ver_menos_button"
          alt="Not Found"
          hidden={!viewMore}
          src={verMenos}
          onClick={() => setViewMore(!viewMore)}
        />

        <span className="container_comments" hidden={!viewMore}>
          <p className="item_comment">{content}</p>
        </span>
      </section>
      {!btnComment && (
        <section>
          <button
            className="myButton"
            onClick={() => {
              modalRef.current.style.display = "block";
            }}
          >
            Comentarios
          </button>
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <span
                className="close"
                onClick={() => {
                  modalRef.current.style.display = "none";
                }}
              >
                &times;
              </span>
              {addComment && <NewCommentForm idTravel={id} addComment={addComment} />}

              <div>
                <CommentList comments={comments} />
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default Travel;
