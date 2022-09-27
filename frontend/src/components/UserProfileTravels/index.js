import TravelList from "../TravelList";

const UserProfileTravels = ({ userTravels }) => {
  return (
    <section>
      <h3>Viajes</h3>

      {userTravels.length > 0 && <TravelList travels={userTravels} />}

      {userTravels.length === 0 && (
        <p>Este usuario aún no ha publicado ningún viaje.</p>
      )}
    </section>
  );
};

export default UserProfileTravels;
