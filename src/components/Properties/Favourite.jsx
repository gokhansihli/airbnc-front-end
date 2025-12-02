import HeartIcon from "../../icons/HeartIcon";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoginModal from "../Header/LoginModal";
import { favouriteProperty, unfavouriteProperty } from "../../utils/api";

export default function Favourite({ property, isFavorited, setIsFavorited }) {
  const [isLoginModal, setIsLoginModal] = useState(false);

  const { user, setUser } = useContext(AuthContext);

  const handleFavorite = async () => {
    if (!user) {
      setIsLoginModal(true);
    } else {
      try {
        if (!isFavorited) {
          await favouriteProperty(property.property_id, user.id, user.token);
          setIsFavorited(true);
        } else {
          await unfavouriteProperty(property.property_id, user.id, user.token);
          setIsFavorited(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
      <button className="favorite-btn" onClick={handleFavorite}>
        <HeartIcon isFavorited={isFavorited} />
      </button>
      <LoginModal isModal={isLoginModal} setIsModal={setIsLoginModal} />
    </div>
  );
}
