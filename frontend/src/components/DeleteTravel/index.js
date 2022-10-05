import React from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import "./styles.css";

const DeleteTravel = ({ idTravel }) => {
  const { token } = useTokenContext();

  const deleteTravelFunction = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/travels/${idTravel}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const body = await res.json();

      if (!res.ok) {
        throw new Error(body.message);
      }
      toast.success(body.message);
      //cambiar estado travels
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <button className="deleteTravel" onClick={deleteTravelFunction}>
      Eliminar
    </button>
  );
};

export default DeleteTravel;
