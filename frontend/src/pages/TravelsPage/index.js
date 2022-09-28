import "./styles.css";
import ErrorMessage from "../../components/ErrorMessage";
import TravelList from "../../components/TravelList";
import useTravels from "../../hooks/useTravels";

const TravelsPage = () => {
  const { travels, errorMessage } = useTravels();

  return (
    <section>
      <h2 className="travel_page_header">Encuentra tu experiencia</h2>
      {travels.length > 0 && <TravelList travels={travels} />}
      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </section>
  );
};

export default TravelsPage;
