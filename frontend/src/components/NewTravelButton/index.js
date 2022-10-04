import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";

const NewTravelButton = () => {
  const { token } = useTokenContext();
  const navigate = useNavigate();

  const newTravelfunction = () => {
    try {
      if (!token) {
        throw new Error("Debes iniciar sesión para compartir un nuevo viaje");
      }

      navigate(`/travels/new`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="new-travel-button">
      <button onClick={newTravelfunction}>Añadir Viaje</button>
    </div>
  );
};

export default NewTravelButton;
