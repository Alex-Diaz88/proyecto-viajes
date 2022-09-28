import "./styles.css";
import React from "react";
import { useState } from "react";

const SearchTravelsForm = ({ setSearchParams, searchParams }) => {
  const [place, setPlace] = useState(searchParams.get("place") || "");
  const [activity, setActivity] = useState(searchParams.get("activity") || "");
  const [order, setOrder] = useState(searchParams.get("order"));
  const [direction, setDirection] = useState(searchParams.get("direction"));

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
      <label htmlFor="searchByPlace">Lugar:</label>
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



      <label htmlFor="orderBy">Ordenado por:</label>

      <select
        id="orderBy"
        value={order}
        onChange={(event) => {
          setOrder(event.target.value);
        }}
      >

        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
      </select>

      <label htmlFor="searchByCreatedAt">Orden Creacion:</label>
      <select
        id="searchByCreatedAt"
        value={order}
        onChange={(event) => {
          setOrder(event.target.value);
        }}
      >
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>

      </select>
      <button>Buscar</button>
    </form>
  );
};

export default SearchTravelsForm;
