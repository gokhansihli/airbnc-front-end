import { useEffect, useState } from "react";
import { getUserFavourites, unfavouriteProperty } from "../../utils/api";
import LoadingDots from "../PropertyDetails/LoadingDots";
import "./userFavourites.css";

export default function UserFavourites({ user }) {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await getUserFavourites(user.id, user.token);
        setFavourites(data.favourites);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavourites();
  }, [user.id, user.token]);

  const removeFavourite = async (fav) => {
    try {
      await unfavouriteProperty(fav.property_id, user.id, user.token);

      setFavourites((cur) =>
        cur.filter((item) => item.favourite_id !== fav.favourite_id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingDots />;

  return (
    <div className="user-favourites-container">
      {favourites.map((fav) => (
        <div key={fav.favourite_id} className="favourite-card-main">
          <div className="favourite-card">
            <img src={fav.image} alt={fav.property_name} />

            <div className="favourite-info">
              <h3>{fav.property_name}</h3>
            </div>
          </div>

          <div className="favourite-btn">
            <button onClick={() => removeFavourite(fav)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
