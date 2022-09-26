import ErrorMessage from "../../components/ErrorMessage";
import SearchTravelsForm from "../../components/SearchTravelsForm";
import TravelList from "../../components/TravelList";
import useTravels from "../../hooks/useTravels";
import setTravels from "../../App.js";

const TravelsPage = () => {
  const { travels, errorMessage } = useTravels();
  console.log(travels);
  return (
    <section>
      <SearchTravelsForm />
      <h2>Viajes</h2>
      {travels.length > 0 && <TravelList travels={travels} />}
      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </section>
  );
};

export default TravelsPage;
