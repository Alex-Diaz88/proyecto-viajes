import "./styles.css";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTokenContext } from "../../contexts/TokenContext";
import Avatar from "../Avatar";

const EditUserForm = ({ user, setUser }) => {
  const {
    avatar: currentAvatar,
    username: currentUsername,
    email: currentEmail,
  } = user;

  const [showEditForm, setShowEditForm] = useState(false);
  const { loggedUser, setLoggedUser } = useTokenContext();
  const { token } = useTokenContext();
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [newAvatarPreview, setNewAvatarPreview] = useState(null);
  const newAvatarRef = useRef();
  const disableImput = !showEditForm ? true : false;

  return (
    <form
      onSubmit={async (event) => {
        try {
          event.preventDefault();

          const file = newAvatarRef.current.files[0];

          if (!(newUsername && newEmail && file)) {
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
      className="edit-user-form"
    >
      <label htmlFor="avatar">
        {!newAvatarPreview && (
          <Avatar avatar={currentAvatar} username={currentUsername} />
        )}

        {newAvatarPreview && (
          <img src={newAvatarPreview} alt={currentUsername} />
        )}
      </label>
      <div className="edit-user-form-container">
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          value={newUsername}
          disabled={disableImput}
          onChange={(event) => {
            setNewUsername(event.target.value);
          }}
          placeholder={currentUsername}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={newEmail}
          disabled={disableImput}
          onChange={(event) => {
            setNewEmail(event.target.value);
          }}
          placeholder={currentEmail}
        />
        <div className="edit-user-form-buttons">
          <div>
            {loggedUser.id === user.id && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditForm(!showEditForm);
                }}
              >
                {!showEditForm && "Editar"}
                {showEditForm && "Cancelar"}
              </button>
            )}
          </div>
          <div className="edit-user-form">
            {showEditForm && <button>Guardar</button>}
          </div>
        </div>
      </div>
      {showEditForm && (
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
      )}
    </form>
  );
};

export default EditUserForm;
