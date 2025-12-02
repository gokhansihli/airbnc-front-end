import { useState } from "react";
import { useSearchParams } from "react-router";
import DateRange from "./DateRange";
import LocationSearch from "./LocationSearch";
import GuestSelector from "./GuestSelector";
import outsideClick from "../../../utils/outsideClick";
import "./search.css";
import SearchIcon from "../../../icons/SearchIcon";

export default function Search({ properties }) {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [isDropdown, setIsDropdown] = useState(false);
  const [isDateDropdown, setIsDateDropdown] = useState(false);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const [guestCount, setGuestCount] = useState(0);
  const [isGuestDropdown, setIsGuestDropdown] = useState(false);

  const closeAllDropdowns = (active) => {
    setIsDropdown(active === "location");
    setIsDateDropdown(active === "date");
    setIsGuestDropdown(active === "guest");
  };

  const handleSearch = () => {
    const params = Object.fromEntries(searchParams.entries());

    if (input) params.location = input;
    if (checkInDate)
      params.check_in_date = checkInDate.toISOString().split("T")[0];
    if (checkOutDate)
      params.check_out_date = checkOutDate.toISOString().split("T")[0];
    if (guestCount > 0) params.guests = guestCount;

    setSearchParams(params);
    closeAllDropdowns(null);
  };

  const searchRef = outsideClick(closeAllDropdowns);

  return (
    <div className="search-bar" ref={searchRef}>
      <LocationSearch
        properties={properties}
        input={input}
        setInput={setInput}
        isOpen={isDropdown}
        onClick={() => closeAllDropdowns("location")}
        onClose={() => setIsDropdown(false)}
      />

      <div className="divider" />

      <DateRange
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        isOpen={isDateDropdown}
        onClick={() => closeAllDropdowns("date")}
      />

      <div className="divider" />

      <GuestSelector
        guestCount={guestCount}
        setGuestCount={setGuestCount}
        isOpen={isGuestDropdown}
        onClick={() => closeAllDropdowns("guest")}
      />

      <button className="search-button" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
}
