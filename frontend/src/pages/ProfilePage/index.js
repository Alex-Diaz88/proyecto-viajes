import "./styles.css";
import { useParams } from "react-router-dom";
import UserProfileInfo from "../../components/UserProfileInfo";
import UserProfileTravels from "../../components/UserProfileTravels";
import useUserById from "../../hooks/useUserById";

const ProfilePage = () => {
  const { userId } = useParams();

  const { user, setUser, deleteUserTravel } = useUserById(userId);

  const { username, userTravels } = user;
  let isNotProfile = true;

  return (
    <section className="profile-page">
      <h2>Perfil del usuario</h2>

      {username && <UserProfileInfo user={user} setUser={setUser} />}

      {userTravels && (
        <UserProfileTravels
          userTravels={userTravels}
          isNotProfile={isNotProfile}
          deleteUserTravel={deleteUserTravel}
        />
      )}
    </section>
  );
};

export default ProfilePage;
