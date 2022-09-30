import "./styles.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const NewTravelButton = () => {
  const navigate = useNavigate();

  return (
    <div className="new-travel-button">
      <button
        onClick={() => {
          navigate(`/travels/new`);
        }}
      >
        Añadir Viaje
      </button>
    </div>
  );
};

export default NewTravelButton;
