import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import buttonLike from "../../assets/icons/button-like.png";
import "./styles.css";
import { useState } from "react";

const ButtonCheck = ({ idTravel }) => {
  const { token } = useTokenContext();
  const [liker, setLiker] = useState(false);

  return (
    <div>
      <img
        className="like"
        alt="Like"
        src={buttonLike}
        onClick={async (event) => {
          try {
            event.preventDefault();
            if (liker !== false) {
              setLiker(false);
            }
            setLiker(true);

            await fetch(`${process.env.REACT_APP_API_URL}/votes/new/${idTravel}`, {
              method: "POST",
              headers: {
                Authorization: token,
              },
            });
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
