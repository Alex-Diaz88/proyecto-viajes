import "./styles.css";

import { useState, useRef, useContext } from "react";

import { useTokenContext } from "../../contexts/TokenContext";
import { AlertContext } from "../../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
/* import { travel } from "../../components/"; */

const NewTravelForm = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [place, setPlace] = useState("");
  const [activity, setActivity] = useState("");
  const [content, setContent] = useState("");
  const [travelPhoto, setTravelPhoto] = useState([]);
  const { token } = useTokenContext();

  const [createdAt] = useState("");
  const photoRef = useRef();
  const [files, setFiles] = useState([]);

  const { setAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  /*   const handleFileChange = (event) => {
    const files = event.target.files;
    setFiles([...files]);
  }; */

  /* const body = { title, entry, place, activity, content }; */

  return (
    <form
      className="newTravelForm"
      onSubmit={async (event) => {
        try {
          event.preventDefault();
          const travelPhoto = photoRef.current.files[0];

          const formData = new FormData();

          formData.append("travel-photo", travelPhoto);
          formData.append("title", title);
          formData.append("entry", entry);
          formData.append("place", place);
          formData.append("activity", activity);
          formData.append("content", content);

          const res = await fetch(`${process.env.REACT_APP_API_URL}/travels/new`, {
            method: "POST",
            headers: {
              Authorization: token,
            },
            body: formData,
          });

          const body = await res.json();
          console.log(res);
          console.log(body);

          if (!res.ok) {
            throw new Error(body.message);
          }

          if (travelPhoto) {
            formData.append("travelPhoto", travelPhoto);
          }

          navigate("/");
        } catch (error) {
          console.error(error.message);
          setAlert({ type: "error", msg: error.message });
        }
      }}
    >
      <p>Created at:{createdAt}</p>
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
      <div className="newTravelFormSelect">
        <label htmlFor="place">Lugar:</label>
        <select
          id="place"
          value={place}
          onChange={(event) => {
            setPlace(event.target.value);
          }}
        >
          <option></option>
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
          <option></option>
          <option value="Cultural">Cultural</option>
          <option value="Deportes">Deportes</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Relajación">Relajación</option>
        </select>
      </div>

      <label htmlFor="content">Descripcion:</label>
      <textarea
        className="description"
        id="content"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      />
      <label htmlFor="photo">Imagenes:</label>
      <input
        className="photo"
        type="file"
        accept="image/*"
        ref={photoRef}
        id="photo"
        value={travelPhoto}
        alt="Sin Imagen"
        multiple
        onChange={(event) => {
          setTravelPhoto(event.target.value);
        }}
      />

      <button>Crear </button>
    </form>
  );
};

export default NewTravelForm;
