import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import buttonLike from "../../assets/icons/button-like.png";
import buttonLiked from "../../assets/icons/checked.png";
import "./styles.css";
import { useEffect, useState } from "react";

const ButtonCheck = ({ idTravel, addVote, deleteVote }) => {
  const { token } = useTokenContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // fetch al back y cambiar el estado liked
  }, []);

  return (
    <div>
      <img
        className="like"
        alt="Like"
        src={liked ? buttonLiked : buttonLike}
        onClick={async (event) => {
          try {
            event.preventDefault();

            const res = await fetch(`${process.env.REACT_APP_API_URL}/votes/new/${idTravel}`, {
              method: "POST",
              headers: {
                Authorization: token,
              },
            });
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
    </div>
  );
};

export default ButtonCheck;

//className={[voteActive ? "active-vote" : null, "button"].join("")}  const [voteActive, setvoteActive] = useState(false);
