import { Link } from "react-router";
import "./propertiesCard.css";

export default function PropertiesCard({ property }) {
  return (
    <div className="propertiesCard">
      <Link to={`/properties/${property.property_id}`}>{property.name}</Link>
    </div>
  );
}
