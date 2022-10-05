import Travel from "../Travel";
import "./styles.css";

const TravelList = ({ travels, addComment, addVote, deleteVote, isNotProfile }) => {
  return (
    <ul className="travel_list">
      {travels.map((travel) => {
        return (
          <li key={travel.id}>
            <Travel travel={travel} addComment={addComment} addVote={addVote} deleteVote={deleteVote} isNotProfile={isNotProfile} />
          </li>
        );
      })}
    </ul>
  );
};

export default TravelList;
