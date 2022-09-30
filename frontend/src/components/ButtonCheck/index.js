import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import buttonLike from "../../assets/icons/button-like.png";
import "./styles.css";

const ButtonCheck = ({ idTravel }) => {
  const { token } = useTokenContext();

  return (
    <div>
      <img
      
        className="like"
        alt="Not Found"
        src={buttonLike}
        onClick={async (event) => {
          try {
            event.preventDefault();
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
