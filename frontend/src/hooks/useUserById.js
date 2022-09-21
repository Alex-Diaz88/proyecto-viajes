import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUserById = (idUser) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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

  /* const sellProduct = (id) => {
    const { userProducts } = user;

    const updatedProducts = userProducts.map((product) => {
      if (product.id === id) {
        product.sold = 1;
      }

      return product;
    });

    setUser({ ...user, userProducts: updatedProducts });
  }; */

  return { user, setUser };
};

export default useUserById;
