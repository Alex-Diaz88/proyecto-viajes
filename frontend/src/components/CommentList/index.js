import React from "react";
import Comment from "../Comment";
import "./styles.css";

const CommentList = ({ comments }) => {
  return (
    <ul className="comment_list">
      {comments?.map((comment) => {
        return (
          <li className="comment_card" key={comment.id}>
            <Comment comment={comment} />
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
