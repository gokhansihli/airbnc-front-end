import HeartIcon from "../../icons/HeartIcon";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { favouriteProperty, unfavouriteProperty } from "../../utils/api";

export default function Favourite({ property, isFavorited, setIsFavorited }) {
  const { user, setUser } = useContext(AuthContext);

  const handleFavorite = async () => {
    //direct user to login page if(!user)

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
  };
  return (
    <div>
      <button className="favorite-btn" onClick={handleFavorite}>
        <HeartIcon isFavorited={isFavorited} />
      </button>
    </div>
  );
}
