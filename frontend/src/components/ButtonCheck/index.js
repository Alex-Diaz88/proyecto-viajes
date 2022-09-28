import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";

const ButtonCheck = ({ idTravel }) => {
  const { token } = useTokenContext();

  return (
    <div>
      <button
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
      >
        Like

      </button>
    </div>
  );
};

export default ButtonCheck;

//className={[voteActive ? "active-vote" : null, "button"].join("")}  const [voteActive, setvoteActive] = useState(false);
