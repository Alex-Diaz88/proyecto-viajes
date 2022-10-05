import Travel from "../Travel";
import "./styles.css";

const TravelList = ({ travels, addComment, addVote, deleteVote }) => {
  return (
    <ul className="travel_list">
      {travels.map((travel) => {
        return (
          <li key={travel.id}>
            <Travel travel={travel} addComment={addComment} addVote={addVote} deleteVote={deleteVote} />
          </li>
        );
      })}
    </ul>
  );
};

export default TravelList;
