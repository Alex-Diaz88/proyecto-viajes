import Comment from "../Comment";

const CommentList = ({ comments }) => {
  return (
    <ul className="comment_list">
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

export default CommentList;
