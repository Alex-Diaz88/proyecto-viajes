import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const Comment = ({ comment }) => {
  const { content, idUser, idTravel, avatar, username } = comment;

  return (
    <article>
        {avatar !== undefined && username && content &&(
          <section className="comment_user_info">
            <Link to={`/travels/${idTravel}`}>
              <Avatar avatar={avatar} username={username} />
            </Link>

            <Link to={`/users/${idUser}`}>
              <p>Subido por {username}</p>
            </Link>
          </section>
        )}
      <section>{content}</section>
    </article>
  );
};


export default Comment;