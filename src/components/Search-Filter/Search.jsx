import { useState, useEffect } from "react";
import "../Search-Filter/search.css";
import { useSearchParams } from "react-router";

export default function Search({ properties }) {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdown, setIsDropdown] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ location: input });
    setIsDropdown(false);
  };

  const location = properties.map((property) => property.location);
  const uniqueLocations = [...new Set(location)];

  const filteredLocations = uniqueLocations.filter((location) =>
    location.toLowerCase().includes(input.toLowerCase())
  );

  const handleSelect = (location) => {
    setInput(location);
    setIsDropdown(false);
  };

  return (
    <div className="search-bar">
      <div className="search-section">
        <span className="label">Location</span>

        <input
          type="text"
          className="value input"
          placeholder="Add city"
          value={input}
          onChange={handleChange}
          onClick={() => setIsDropdown(true)}
        />
        {isDropdown && (
          <ul className="dropdown-content">
            {filteredLocations.map((location) => (
              <li
                className="content"
                key={location}
                onClick={() => {
                  handleSelect(location);
                }}
              >
                {location}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="divider" />
      <div className="search-section">
        <span className="label">Date</span>
        <span className="value">Add dates</span>
      </div>
      <div className="divider" />
      <div className="search-section">
        <span className="label">Guest</span>
        <span className="value">Add guests</span>
      </div>
      <button className="search-button" onClick={handleSearch}>
        &#x2C3;
      </button>
    </div>
  );
}
