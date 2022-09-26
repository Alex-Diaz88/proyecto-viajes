import ErrorMessage from "../../components/ErrorMessage";
import SearchTravelsForm from "../../components/SearchTravelsForm";
import TravelList from "../../components/TravelList";
import useTravels from "../../hooks/useTravels";

const TravelsPage = () => {
  const { travels, setSearchParams, errorMessage, searchParams } = useTravels();
  console.log(travels);
  return (
    <section>
      <SearchTravelsForm setSearchParams={setSearchParams} searchParams={searchParams} />
      <h2>Viajes</h2>
      {travels.length > 0 && <TravelList travels={travels} />}
      {errorMessage && <ErrorMessage msg={errorMessage} />}
    </section>
  );
};

export default TravelsPage;
