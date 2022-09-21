import "./styles.css";
import Comment from "../Comment";
import { comments } from "../../App";

const CommentsList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentsList;