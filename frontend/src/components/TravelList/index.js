import Travel from "../Travel";
import "./styles.css";

const TravelList = ({ travels, addComment }) => {
  return (
    <ul className="travel_list">
      {travels.map((travel) => {
        return (
          <li key={travel.id}>
            <Travel travel={travel} addComment={addComment} />
          </li>
        );
      })}
    </ul>
  );
};

export default TravelList;
