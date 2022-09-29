import { useState } from "react";
import EditUserForm from "../EditUserForm";

const UserProfileInfo = ({ user, setUser }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <section className="user-profile-info">
      <EditUserForm
        user={user}
        setShowEditForm={setShowEditForm}
        setUser={setUser}
        showEditForm={showEditForm}
      />
    </section>
  );
};
export default UserProfileInfo;
