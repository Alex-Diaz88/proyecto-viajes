import { useState, useEffect } from "react";

const useTravels = () => {
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}travels`);
        const body = await res.json();

        if (!res.ok) {
          throw new Error("Error intentando conectar con la API de viajes");
        }

        setTravels(body.data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      }
    };

    fetchTravels();
  }, []);

  return { travels, errorMessage };
};

export default useTravels;
