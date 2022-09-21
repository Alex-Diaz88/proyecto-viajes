import { useParams } from "react-router-dom";
import useUserById from "../../hooks/useUserById";
import UserProfileInfo from "../../components/UserProfileInfo";
import UserProfileProducts from "../../components/UserProfileProducts";

const ProfilePage = () => {
  const { userId } = useParams();

  const { user, setUser, sellProduct } = useUserById(userId);

  const { username, userProducts } = user;

  return (
    <section>
      <h2>Profile</h2>

      {username && <UserProfileInfo user={user} setUser={setUser} />}

      {userProducts && (
        <UserProfileProducts
          userProducts={userProducts}
          sellProduct={sellProduct}
        />
      )}
    </section>
  );
};

export default ProfilePage;
