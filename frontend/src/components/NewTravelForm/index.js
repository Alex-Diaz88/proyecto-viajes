import "./styles.css";
import { useState, useContext } from "react";
import { useTokenContext } from "../../contexts/TokenContext";
import { AlertContext } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";

const NewTravelForm = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [place, setPlace] = useState("");
  const [activity, setActivity] = useState("");
  const [content, setContent] = useState("");
  const { token } = useTokenContext();
  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  return (
    <form
      className="entryForm"
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const newTravel = { title, entry, place, activity, content };

          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/travels/new`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify(newTravel),
            }
          );
          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
          navigate("/");
        } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
        }
      }}
    >
      <label htmlFor="title">Titulo:</label>
      <input
        id="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <label htmlFor="entry">Entrada:</label>
      <input
        id="entry"
        value={entry}
        onChange={(event) => {
          setEntry(event.target.value);
        }}
      />
      <div>
        <label htmlFor="place">Lugar:</label>
        <select
          id="place"
          value={place}
          onChange={(event) => {
            setPlace(event.target.value);
          }}
        >
          <option value="Coriolis">Coriolis</option>
          <option value="Jina">Jina</option>
          <option value="Kua">Kua</option>
          <option value="Lubau">Lubau</option>
          <option value="Surha">Surha</option>
          <option value="Xene">Xene</option>
        </select>

        <label htmlFor="activity">Actividad:</label>
        <select
          id="activity"
          value={activity}
          onChange={(event) => {
            setActivity(event.target.value);
          }}
        >
          <option value="Cultural">Cultural</option>
          <option value="Deportes">Deportes</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Relajación">Relajación</option>
        </select>
      </div>

      <label htmlFor="content">Descripcion:</label>
      <input
        className="description"
        id="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      />

      <button>Create product</button>
    </form>
  );
};

export default NewTravelForm;
