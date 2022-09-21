import TravelList from "../../components/TravelList";
import ErrorMessage from "../../components/ErrorMessage";
import useTravels from "../../hooks/useTravels";
import LoginForm from "../../components/LoginForm";

const FrontPage = () => {
  const { travels, errorMessage } = useTravels();

  return (
      <section>
        <h2>Viajes</h2>
        {travels.length > 0 && <TravelList travels={travels} />}
        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </section>
  );
};

export default FrontPage;
