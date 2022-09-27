import Travel from "../Travel";
import "./styles.css";

const TravelList = ({ travels }) => {
  console.log(travels);
  return (
    <ul className="travel_list">
      {travels.map((travel) => {
        return (
          <li key={travel.id}>
            <Travel travel={travel} />
          </li>
        );
      })}
    </ul>
  );
};

export default TravelList;
