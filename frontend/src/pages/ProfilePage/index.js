import "./styles.css";
import { useParams } from "react-router-dom";
import UserProfileInfo from "../../components/UserProfileInfo";
import UserProfileTravels from "../../components/UserProfileTravels";
import useUserById from "../../hooks/useUserById";

const ProfilePage = () => {
  const { userId } = useParams();

  const { user, setUser } = useUserById(userId);

  const { username, userTravels } = user;
  console.log(userTravels);
  return (
    <section className="profile-page">
      <h2>Perfil del usuario</h2>

      {username && <UserProfileInfo user={user} setUser={setUser} />}

      {userTravels && <UserProfileTravels userTravels={userTravels} />}
    </section>
  );
};

export default ProfilePage;
