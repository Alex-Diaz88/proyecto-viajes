import { useState } from "react";

const SearchTravelsForm = ({ setTravels }) => {
  const [searchByPlace, setSearchByPlace] = useState("");
  const [searchByActivity, setSearchByActivity] = useState("");
  const [orderByVotes, setOrderByVotes] = useState("ASC");
  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();
          const res = await fetch(
            `http://localhost:4000/travels?place=${searchByPlace}&activity=${searchByActivity}&votes=${orderByVotes}`,
          );
          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }

          setTravels(body.data);
        } catch (error) {
          console.error(error.message);
        }
      }}
    >
      <label htmlFor="searchByPlace">Buscar por Lugar:</label>
      <select
        id="searchByPlace"
        value={searchByPlace}
        onChange={(event) => {
          setSearchByPlace(event.target.value);
        }}
      >
        <option></option>
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
        value={searchByActivity}
        onChange={(event) => {
          setSearchByActivity(event.target.value);
        }}
      >
        <option></option>
        <option value={"Cultura"}>Cultura</option>
        <option value={"Deportes"}>Deportes</option>
        <option value={"Gastronomía"}>Gastronomía</option>
        <option value={"Naturaleza"}>Naturaleza</option>
        <option value={"Naturaleza"}>Naturaleza</option>
      </select>

      <label htmlFor="searchByVotes">Ordenar por Votos:</label>
      <select
        id="searchByVotes"
        value={orderByVotes}
        onChange={(event) => {
          setOrderByVotes(event.target.value);
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
