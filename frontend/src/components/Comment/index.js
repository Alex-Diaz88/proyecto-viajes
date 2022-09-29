import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import "./styles.css";

const Comment = ({ comment }) => {
  const { content, idUser, avatar, username } = comment;

  return (
    <article>
      <section className="comment_user_info">
        <Link to={`/profile/${idUser}`}>
          <Avatar avatar={avatar} username={username} />
        </Link>

        <Link to={`/profile/${idUser}`}>
          <p>Subido por {username}</p>
        </Link>
      </section>

      <p>{content}</p>
    </article>
  );
};

export default Comment;
