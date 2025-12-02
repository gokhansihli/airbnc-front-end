import HeartSmallIcon from "../../icons/HeartSmallIcon";
import PlaneIcon from "../../icons/PlaneIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import SwitchIcon from "../../icons/switchIcon";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./userDrop.css";
import { Link } from "react-router";

export default function UserDrop({ isDrop, setIsDrop }) {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null); // clear user from state and localStorage
  };

  const handleDrop = () => {
    setIsDrop(false);
  };

  return (
    <>
      {isDrop && (
        <div className="drop-content">
          <Link
            to={`/users/${user.id}?section=profile`}
            className="content"
            onClick={handleDrop}
          >
            <ProfileIcon /> Profile
          </Link>

          <div className="content-divider"></div>
          <Link
            to={`/users/${user.id}?section=bookings`}
            className="content"
            onClick={handleDrop}
          >
            <PlaneIcon /> Bookings
          </Link>
          <Link
            to={`/users/${user.id}?section=favourites`}
            className="content"
            onClick={handleDrop}
          >
            <HeartSmallIcon /> Favourites
          </Link>

          <div className="content-divider"></div>
          <div className="content" onClick={handleLogout}>
            Log out
          </div>
        </div>
      )}
    </>
  );
}
