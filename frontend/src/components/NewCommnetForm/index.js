import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../contexts/TokenContext";

const NewCommentForm = () => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { token } = useTokenContext();

  return (
    <form
      onsubmit={async (event) => {
        try {
          event.preventDefault();

          const newComment = [comment];
          const res = await fetch(`${process.env.REACT_APP_API_URL}/comment/new`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify(newComment),
          });
          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
          navigate("/");
        } catch (error) {
          console.error(error.message);
        }
      }}
    >
      <label htmlFor="content">Contenido:</label>
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
