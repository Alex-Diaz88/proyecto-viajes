import TravelList from "../TravelList";

const UserProfileTravels = ({ userTravels }) => {
  return (
    <section>
      <h3>Viajes del usuario</h3>

      {userTravels.length > 0 && <TravelList travel={userTravels} />}

      {userTravels.length === 0 && (
        <p>Este usuario aún no ha subido ningún viaje</p>
      )}
    </section>
  );
};

export default UserProfileTravels;
