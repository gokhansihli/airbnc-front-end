import "./modalButtons.css";
import amenityIcons from "../../../icons/amenityIcons";

export default function Amenities({
  amenities,
  selectAmenity,
  setSelectAmenity,
}) {
  const toggleAmenity = (slug) => {
    setSelectAmenity((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug]
    );
  };

  return (
    <div>
      <h2>Amenities</h2>

      <div className="modal-buttons">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity.amenity_text]; // match by text

          return (
            <button
              key={amenity.amenity_slug}
              className={`modal-button ${
                selectAmenity.includes(amenity.amenity_slug) ? "active" : ""
              }`}
              onClick={() => toggleAmenity(amenity.amenity_slug)}
            >
              {Icon && <Icon className="icon-small" />}
              <span>{amenity.amenity_text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
