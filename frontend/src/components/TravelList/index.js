import Travel from "../Travel";
import "./styles.css";
import { travels } from "../../App";

const TravelList = ({ travels }) => {
  return (
    <ul>
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
