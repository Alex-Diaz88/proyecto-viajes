/* import { useNavigate } from "react-router-dom"; */

import { useState, useContext } from "react";

import { useTokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewCommentForm = ({ idTravel, addComment }) => {
  const [comment, setComment] = useState("");

  /* const navigate = useNavigate(); */

  const { token } = useTokenContext();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const newComment = { content: comment };
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/comments/${idTravel}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify(newComment),
            }
          );
          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
          addComment(body.data, idTravel);
          setComment("");
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="content">Comentario:</label>
      <input
        id="content"
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
        }}
      />
      <button>Publicar</button>
    </form>
  );
};

export default NewCommentForm;
