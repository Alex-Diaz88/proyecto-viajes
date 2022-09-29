import defaultAvatar from "../../assets/images/defaultAvatar.png";

const Avatar = ({ avatar, username }) => {
  return (
    <div className="avatar">
      {!avatar && <img src={defaultAvatar} alt={username} />}
      {avatar && (
        <img
          src={`${process.env.REACT_APP_API_URL}/avatars/${avatar}`}
          alt={username}
        />
      )}
    </div>
  );
};

export default Avatar;
