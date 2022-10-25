import Travel from "../Travel";
import "./styles.css";

const TravelList = ({ travels, addComment, addVote, deleteVote, isProfile, deleteUserTravel }) => {
  console.log(travels);
  return (
    <ul className="travel_list">
      {travels.map((travel) => {
        return (
          <li key={travel.id}>
            <Travel
              travel={travel}
              addComment={addComment}
              addVote={addVote}
              deleteVote={deleteVote}
              isProfile={isProfile}
              deleteUserTravel={deleteUserTravel}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TravelList;
