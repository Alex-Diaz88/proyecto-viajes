import TravelList from "../../components/TravelList";
import ErrorMessage from "../../components/ErrorMessage";
import useTravels from "../../hooks/useTravels";
import LoginForm from "../../components/LoginForm";

const FrontPage = () => {
  const { travels, errorMessage } = useTravels();

  return (
    <div>
      <section>
        <h2>Ingresar</h2>
        <LoginForm />
        <a href="/register">¿No tienes una cuenta? Regístrate.</a>
      </section>
      <section>
        <h2>Viajes</h2>
        {travels.length > 0 && <TravelList travels={travels} />}
        {errorMessage && <ErrorMessage msg={errorMessage} />}
      </section>
    </div>
  );
};

export default FrontPage;
