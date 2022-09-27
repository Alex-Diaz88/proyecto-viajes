import Avatar from "../Avatar";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";

const EditUserForm = ({ user, setUser, setShowEditForm }) => {
  const {
    avatar: currentAvatar,
    username: currentUsername,
    email: currentEmail,
  } = user;

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAvatarPreview, setNewAvatarPreview] = useState("");

  const newAvatarRef = useRef();

  const { token } = useTokenContext();

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

          if (newUsername || newEmail) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({ username: newUsername, email: newEmail }),
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setUser({
              ...user,
              username: newUsername || user.username,
              email: newEmail || user.email,
            });
          }

          if (file) {
            const formData = new FormData();

            formData.append("avatar", file);

            const res = await fetch(
              `${process.env.REACT_APP_API_URL}/users/avatar`,
              {
                method: "PUT",
                headers: {
                  Authorization: token,
                },
                body: formData,
              }
            );

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            const avatar = body.data.avatarName;

            setUser({ ...user, avatar });
          }

          toast.success("Profile updated succesfully!");
          setShowEditForm(false);
        } catch (error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }}
    >
      <label htmlFor="avatar">
        {!newAvatarPreview && (
          <Avatar avatar={currentAvatar} username={currentUsername} />
        )}

        {newAvatarPreview && (
          <img src={newAvatarPreview} alt={currentUsername} />
        )}
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
