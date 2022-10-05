import "./styles.css";
import React from "react";
import ErrorMessage from "../../components/ErrorMessage";
import TravelList from "../../components/TravelList";
import useTravels from "../../hooks/useTravels";
import NewTravelButton from "../../components/NewTravelButton";

const TravelsPage = () => {
  const { travels, errorMessage, addComment, addVote, deleteVote } = useTravels();

  return (
    <section>
      <h2 className="travel_page_header">Descubre nuevas experiencias</h2>
      <NewTravelButton />
      {travels.length > 0 && (
        <TravelList travels={travels} addComment={addComment} addVote={addVote} deleteVote={deleteVote} />
      )}
      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </section>
  );
};

export default TravelsPage;
