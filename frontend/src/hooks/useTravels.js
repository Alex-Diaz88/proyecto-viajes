import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useTravels = () => {
  const [travels, setTravels] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/travels?${searchParams.toString()}`);
        const body = await res.json();

        if (!res.ok) {
          throw new Error("Unexpected error fetching API. Please, try again or contact support");
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
  }, [searchParams]);

  return { travels, errorMessage, loading, setSearchParams, searchParams };
};

export default useTravels;
