import "./locationSearch.css";

export default function LocationSearch({
  properties,
  input,
  setInput,
  isOpen,
  onClick,
  onClose,
}) {
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const location = properties.map((property) => property.location);
  const uniqueLocations = [...new Set(location)];
  const filteredLocations = uniqueLocations.filter((location) =>
    location.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (location) => {
    setInput(location);
    onClose();
  };

  return (
    <div className="search-section">
      <span className="label" onClick={onClick}>
        Location
      </span>
      <input
        type="text"
        className="value input"
        placeholder="Add city"
        value={input}
        onChange={handleChange}
        onClick={onClick}
      />
      {isOpen && (
        <ul className="dropdown-content">
          {filteredLocations.map((location) => (
            <li
              className="content"
              key={location}
              onClick={() => handleSelect(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
