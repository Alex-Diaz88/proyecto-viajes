import "./styles.css";
import TravelList from "../TravelList";

const UserProfileTravels = ({ userTravels, isNotProfile }) => {
  return (
    <section className="user-profile-travels">
      <h3>Viajes</h3>

      {userTravels.length > 0 && <TravelList travels={userTravels} isNotProfile={isNotProfile}/>}

      {userTravels.length === 0 && (
        <p>Este usuario aún no ha publicado ningún viaje.</p>
      )}
    </section>
  );
};

export default UserProfileTravels;
