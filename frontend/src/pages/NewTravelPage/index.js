import { Navigate } from "react-router-dom";
import NewTravelForm from "../../components/NewTravelForm";
import { useTokenContext } from "../../contexts/TokenContext";

const NewTravelPage = () => {
  const { token } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>Nuevo Viaje</h2>

      <NewTravelForm />
    </section>
  );
};

export default NewTravelPage;
