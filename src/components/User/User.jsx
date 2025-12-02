import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getUser } from "../../utils/api";
import { AuthContext } from "../../contexts/AuthContext";
import "./user.css";

import LoadingDots from "../PropertyDetails/LoadingDots";
import UserProfile from "./UserProfile";
import UserBookings from "./UserBookings";
import UserFavourites from "./UserFavourites";

export default function User() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [firstName, setFirstName] = useState(user.first_name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "");
  const [isHost, setIsHost] = useState(user.is_host);
  const [avatar, setAvatar] = useState(user.avatar || "");

  if (!user) return null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(user.id, user.token);
        setFirstName(userData.first_name);
        setSurname(userData.surname);
        setEmail(userData.email);
        setPhoneNumber(userData.phone_number || "");
        setAvatar(userData.avatar || "");
        setIsHost(userData.is_host);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user.id, user.token]);

  const section = searchParams.get("section") || "profile";

  const profileProps = {
    user: user,
    firstName,
    setFirstName,
    surname,
    setSurname,
    phoneNumber,
    setPhoneNumber,
    email,
    isHost,
    avatar,
    setEmail,
  };

  if (isLoading) {
    return (
      <div>
        {" "}
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="user-page-container">
      <div className="user-main-content">
        <div className="user-left-column">
          <button
            onClick={() => setSearchParams({ section: "profile" })}
            className={section === "profile" ? "active" : ""}
          >
            Profile
          </button>
          <button
            onClick={() => setSearchParams({ section: "bookings" })}
            className={section === "bookings" ? "active" : ""}
          >
            Bookings
          </button>
          <button
            onClick={() => setSearchParams({ section: "favourites" })}
            className={section === "favourites" ? "active" : ""}
          >
            Favourites
          </button>
        </div>

        <div className="user-right-column">
          {section === "profile" && <UserProfile {...profileProps} />}
          {section === "bookings" && <UserBookings user={user} />}
          {section === "favourites" && <UserFavourites user={user} />}
        </div>
      </div>
    </div>
  );
}
