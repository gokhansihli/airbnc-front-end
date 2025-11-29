import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import "./propertiesCard.css";
import Favourite from "./Favourite";

export default function PropertiesCard({ property }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && property.property_id) {
      setIsFavorited(property.property_id === user.id);
    } else {
      setIsFavorited(false);
    }
  }, [user, property]);

  return (
    <div className="propertiesCard">
      <div className="image-wrapper">
        <Favourite
          property={property}
          isFavorited={isFavorited}
          setIsFavorited={setIsFavorited}
        />
      </div>
      <Link to={`/properties/${property.property_id}`} className="property">
        <img
          src={property.image}
          alt="property image"
          className="property-img"
        />
        <div className="property-type">
          <div>
            {property.property_type} in {property.location.split(",")[0]}
          </div>
          <div className="rating">
            ★ {property.avg_rating}.0 ({property.favourited_count})
          </div>
        </div>
        <div className="property-name">{property.name}</div>
        <div className="host-name">{property.host} (Host)</div>
        <div style={{ paddingTop: 10 }}>
          <span className="price">£{property.price_per_night}</span>{" "}
          <span style={{ fontWeight: 200 }}>for one night</span>
        </div>
      </Link>
    </div>
  );
}
