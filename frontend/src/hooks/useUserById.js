import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUserById = (idUser) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const deleteUserTravel = (idTravel) => {
    const travelIndex = user.userTravels.findIndex((travel) => {
      return travel.id === idTravel;
    });
    user.userTravels.splice(travelIndex, 1);
    setUser({ ...user });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${idUser}`
        );

        const body = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            navigate("/notfound");
          }

          throw new Error(body.message);
        }

        setUser(body.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [idUser, navigate]);

  return { user, setUser, deleteUserTravel };
};

export default useUserById;
