import Avatar from "../Avatar";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import LoggedUser from "../LoggedUser";

const EditUserForm = ({ user, setUser, setShowEditForm }) => {
  const { avatar: currentAvatar, username: currentUsername, email: currentEmail } = user;

  const { loggedUser, setLoggedUser } = useTokenContext();
  const { token } = useTokenContext();

  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newAvatarPreview, setNewAvatarPreview] = useState("");

  const newAvatarRef = useRef();

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const file = newAvatarRef.current.files[0];

          if (!(newUsername || newEmail || file)) {
            toast.warn("No has introducido ningún cambio.");
            return;
          }

          const data = new FormData();
          data.append("username", newUsername);
          data.append("email", newEmail);

          if (file) {
            data.append("avatar", file);
          }

          if (newUsername || newEmail) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
              method: "PUT",
              headers: {
                Authorization: token,
              },
              body: data,
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setLoggedUser({
              ...loggedUser,
              avatar: body.data.avatar,
              email: body.data.email,
              username: body.data.username,
            });

            setUser({
              ...user,
              avatar: body.data.avatar,
              email: body.data.email,
              username: body.data.username,
            });
          }
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="avatar">
        {!newAvatarPreview && <Avatar avatar={currentAvatar} username={currentUsername} />}

        {newAvatarPreview && <img src={newAvatarPreview} alt={currentUsername} />}
      </label>
      <input
        id="avatar"
        type="file"
        hidden
        ref={newAvatarRef}
        onChange={() => {
          const file = newAvatarRef.current.files[0];

          setNewAvatarPreview(URL.createObjectURL(file));
        }}
      />

      <label htmlFor="username">Username:</label>
      <input
        id="username"
        value={newUsername}
        onChange={(event) => {
          setNewUsername(event.target.value);
        }}
        placeholder={currentUsername}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={newEmail}
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
        placeholder={currentEmail}
      />

      <button>Guardar cambios</button>
    </form>
  );
};

export default EditUserForm;
