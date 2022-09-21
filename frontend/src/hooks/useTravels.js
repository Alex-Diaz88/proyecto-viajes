import { useState, useEffect } from "react";

const useTravels = () => {
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/travels`);
        const body = await res.json();

        if (!res.ok) {
          throw new Error(
            "Unexpected error fetching API. Please, try again or contact support"
          );
        }

        setTravels(body.data);
      } catch (error) {
        console.error(error.message);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  return { travels, errorMessage, loading };
};

export default useTravels;
