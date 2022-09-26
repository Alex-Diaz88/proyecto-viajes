import "./styles.css";
import { useState } from "react";

const SearchTravelsForm = ({ setSearchParams, searchParams }) => {
  const [place, setPlace] = useState(searchParams.get("place") || "");
  const [activity, setActivity] = useState(searchParams.get("activity") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "DESC");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const queryParams = { place, activity };

        if (place) {
          queryParams.place = place;
        }

        if (activity) {
          queryParams.activity = activity;
        }

        setSearchParams(new URLSearchParams(queryParams));
      }}
      className="searchTravelForm"
    >
      <label htmlFor="searchByPlace">Buscar por Lugar:</label>
      <select
        id="searchByPlace"
        value={place}
        onChange={(event) => {
          setPlace(event.target.value);
        }}
      >
        <option value="">Todas las localizaciones</option>
        <option value={"Coriolis"}>Coriolis</option>
        <option value={"Jina"}>Jina</option>
        <option value={"Kua"}>Kua</option>
        <option value={"Lubau"}>Lubau</option>
        <option value={"Surha"}>Surha</option>
        <option value={"Xene"}>Xene</option>
      </select>

      <label htmlFor="searchByActivity">Buscar por Actividad</label>
      <select
        id="searchByActivity"
        value={activity}
        onChange={(event) => {
          setActivity(event.target.value);
        }}
      >
        <option value="">Todas las Actividades</option>
        <option value={"Cultura"}>Cultura</option>
        <option value={"Deportes"}>Deportes</option>
        <option value={"Gastronomía"}>Gastronomía</option>
        <option value={"Naturaleza"}>Naturaleza</option>
        <option value={"Naturaleza"}>Naturaleza</option>
      </select>

      <label htmlFor="searchByVotes">Ordenar por Votos:</label>
      <select
        id="searchByVotes"
        value={order}
        onChange={(event) => {
          setOrder(event.target.value);
        }}
      >
        <option value="ASC">Mas votados</option>
        <option value="DESC">Menos votados</option>
      </select>
      <button>Buscar</button>
    </form>
  );
};

export default SearchTravelsForm;
