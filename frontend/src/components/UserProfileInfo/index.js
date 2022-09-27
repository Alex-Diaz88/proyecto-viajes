import { useState } from "react";
import Avatar from "../Avatar";
import EditUserForm from "../EditUserForm";
import { useTokenContext } from "../../contexts/TokenContext";

const UserProfileInfo = ({ user, setUser }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { avatar, username, email, createdAt } = user;
  const { loggedUser } = useTokenContext();

  return (
    <section>
      <h3>Información</h3>

      {!showEditForm && (
        <>
          <Avatar avatar={avatar} username={username} />
          <p>{username}</p>
          <p>{email}</p>
          <p>{createdAt.split("T")[0]}</p>
        </>
      )}

      {showEditForm && (
        <EditUserForm
          user={user}
          setShowEditForm={setShowEditForm}
          setUser={setUser}
        />
      )}

      {loggedUser.id === user.id && (
        <button
          onClick={() => {
            setShowEditForm(!showEditForm);
          }}
        >
          {!showEditForm && "Editar"}
          {showEditForm && "Dejar de editar"}
        </button>
      )}
    </section>
  );
};
export default UserProfileInfo;
