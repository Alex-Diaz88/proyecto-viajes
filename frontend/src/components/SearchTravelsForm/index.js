import "./styles.css";
import React from "react";
import { useState } from "react";

const SearchTravelsForm = ({ setSearchParams, searchParams }) => {
  const [place, setPlace] = useState(searchParams.get("place") || "");
  const [activity, setActivity] = useState(searchParams.get("activity") || "");
  const [order, setOrder] = useState(searchParams.get("order") || "createdAt");

  return (
    <form
      className="search-travel"
      onSubmit={(event) => {
        event.preventDefault();
        const queryParams = { place, activity, order };

        if (place) {
          queryParams.place = place;
        }

        if (activity) {
          queryParams.activity = activity;
        }

        if (order) {
          queryParams.order = order;
        }

        setSearchParams(new URLSearchParams(queryParams));
      }}
    >
      <div>
        <label htmlFor="searchByPlace">Lugar</label>
        <select
          id="searchByPlace"
          value={place}
          onChange={(event) => {
            setPlace(event.target.value);
          }}
        >
          <option value="">Cualquiera</option>
          <option value={"Coriolis"}>Coriolis</option>
          <option value={"Jina"}>Jina</option>
          <option value={"Kua"}>Kua</option>
          <option value={"Lubau"}>Lubau</option>
          <option value={"Surha"}>Surha</option>
          <option value={"Xene"}>Xene</option>
        </select>
      </div>

      <div>
        <label htmlFor="searchByActivity">Actividad</label>
        <select
          id="searchByActivity"
          value={activity}
          onChange={(event) => {
            setActivity(event.target.value);
          }}
        >
          <option value="">Cualquiera</option>
          <option value={"Cultural"}>Cultura</option>
          <option value={"Deportes"}>Deportes</option>
          <option value={"Gastronomía"}>Gastronomía</option>
          <option value={"Naturaleza"}>Naturaleza</option>
          <option value={"Relajación"}>Relajación</option>
        </select>
      </div>


      <div>
        <label htmlFor="orderBy">Ordenar por</label>
        <select
          id="orderBy"
          value={order}
          onChange={(event) => {
            setOrder(event.target.value);
          }}
        >
          <option value="createdAt">Más recientes</option>
          <option value="votes">Mejor valorados</option>
        </select>
      </div>


      <button>Buscar</button>
    </form>
  );
};

export default SearchTravelsForm;
