import TravelList from "../../components/TravelList";
import { useState } from "react";

const FrontPage = () => {
  const [travels, setTravels] = useState([]);
  return (
    <>
      <section>

      </section>
      <section>
        <TravelList travels={travels} />
      </section>
    </>
  );
};

export default FrontPage;
