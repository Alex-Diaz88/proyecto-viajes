import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("../../components/RegisterForm");
      }}
    >
      Registrate
    </button>
  );
};

export default RegisterButton;
