import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import buttonLike from "../../assets/icons/no-me-gusta.png";
import buttonLiked from "../../assets/icons/me-gusta.png";
import "./styles.css";
import { useEffect, useState } from "react";

const ButtonCheck = ({ idTravel, addVote, deleteVote }) => {
  const { token } = useTokenContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (token) {
      const checkVotes = async () => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/votes/check/${idTravel}`,
            { headers: { authorization: token } }
          );
          const body = await res.json();

          if (!res.ok) {
            throw new Error(
              "Unexpected error fetching API. Please, try again or contact support"
            );
          }

          setLiked(body.data.voted);
        } catch (error) {
          console.error(error.message);
        }
      };

      checkVotes();
    }
  }, []);

  return (
    <form>
      <img
        className="like"
        alt="Like"
        src={liked ? buttonLiked : buttonLike}
        onClick={async (event) => {
          try {
            event.preventDefault();

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/votes/new/${idTravel}`,
              {
                method: "POST",
                headers: {
                  Authorization: token,
                },
              }
            );
            if (!res.ok) {
              const body = await res.json();

              throw new Error(body.message);
            }

            if (liked) {
              setLiked(false);
              deleteVote(idTravel);
              return;
            }

            setLiked(true);
            addVote(idTravel);
          } catch (error) {
            console.error(error.message);
            toast.error(error.message);
          }
        }}
      />
    </form>
  );
};

export default ButtonCheck;
