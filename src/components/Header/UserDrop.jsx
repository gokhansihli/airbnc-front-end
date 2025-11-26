import HeartSmallIcon from "../../icons/HeartSmallIcon";
import PlaneIcon from "../../icons/PlaneIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import SwitchIcon from "../../icons/switchIcon";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./userDrop.css";

export default function UserDrop({ isDrop }) {
  const { setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null); // clear user from state and localStorage
  };

  return (
    <>
      {isDrop && (
        <div className="drop-content">
          <div className="content">
            <ProfileIcon /> Profile
          </div>
          <div className="content-divider"></div>
          <div className="content">
            <PlaneIcon /> Bookings
          </div>
          <div className="content">
            <HeartSmallIcon /> Favourites
          </div>
          <div className="content-divider"></div>
          <div className="content">
            <SwitchIcon /> Switch account
          </div>
          <div className="content-divider"></div>
          <div className="content" onClick={handleLogout}>
            Log out
          </div>
        </div>
      )}
    </>
  );
}
