import "./modalButtons.css";

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
        {amenities.map((amenity) => (
          <button
            key={amenity.amenity_slug}
            className={`modal-button ${
              selectAmenity.includes(amenity.amenity_slug) ? "active" : ""
            }`}
            onClick={() => toggleAmenity(amenity.amenity_slug)}
          >
            {amenity.amenity_text}
          </button>
        ))}
      </div>
    </div>
  );
}
