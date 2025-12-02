import { patchUser } from "../../utils/api";
import ProfileIcon from "../../icons/ProfileIcon";
import { userFieldIcons } from "../../icons/userFieldIcons";
import UserInput from "./UserInput";
import "./userProfile.css";

export default function UserProfile({
  user,
  firstName,
  surname,
  phoneNumber,
  email,
  isHost,
  avatar,
  setFirstName,
  setSurname,
  setPhoneNumber,
  setEmail,
}) {
  const Icon = userFieldIcons.firstName;
  const PhoneIcon = userFieldIcons.phone;
  const EmailIcon = userFieldIcons.email;

  const updateUser = async () => {
    try {
      const updateData = {
        first_name: firstName,
        surname: surname,
        phone: phoneNumber,
        email: email,
        is_host: isHost,
        avatar: avatar,
      };

      await patchUser(user.id, updateData, user.token);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div>
      <div className="user-header">
        <div className="avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <h2>
          {firstName} {surname}
        </h2>
      </div>
      <div className="user-content">
        <div className="user-field">
          <Icon className="user-field-icon" />
          <UserInput
            value={firstName}
            onChange={setFirstName}
            onFinish={updateUser}
          />
        </div>
        <div className="user-field">
          <Icon className="user-field-icon" />
          <UserInput
            value={surname}
            onChange={setSurname}
            onFinish={updateUser}
          />
        </div>
        <div className="user-field">
          <PhoneIcon className="user-field-icon" />
          <UserInput
            value={phoneNumber}
            onChange={setPhoneNumber}
            onFinish={updateUser}
          />
        </div>
        <div className="user-field">
          <EmailIcon className="user-field-icon" />
          <UserInput
            type="email"
            value={email}
            onChange={setEmail}
            onFinish={updateUser}
          />
        </div>
      </div>
    </div>
  );
}
