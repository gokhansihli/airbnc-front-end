import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import LoginModal from "../Header/LoginModal";
import GuestSelector from "../Search-Filter/Search/GuestSelector";
import outsideClick from "../../utils/outsideClick";

import "./bookingBox.css";

export default function BookingBox({ property, checkIn, checkOut }) {
  const [error, setError] = useState("");
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  const [guest, setGuest] = useState(1);
  const checkInDate = checkIn;
  const checkOutDate = checkOut;

  const navigate = useNavigate(); // similar to <Link />
  const dropRef = outsideClick(() => setIsGuestOpen(false));

  const { user } = useContext(AuthContext);

  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })
      : "";
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const time = checkOutDate.getTime() - checkInDate.getTime();
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    return days;
  };

  const nights = calculateNights();
  const totalPrice = nights > 0 ? nights * property.price_per_night : 0;

  const handleReserve = () => {
    if (!user) {
      setIsLoginModal(true);
    } else {
      if (!checkInDate || !checkOutDate || totalPrice === 0)
        return setError("Please select dates!");

      if (!property || !property.property_id) {
        setError("Property data not fully loaded. Please wait.");
        return;
      }
      const checkInISO = checkInDate.toISOString();
      const checkOutISO = checkOutDate.toISOString();
      navigate(
        `/properties/${property.property_id}/booking?checkInDate=${checkInISO}&checkOutDate=${checkOutISO}&guest=${guest}&nights=${nights}`
      );
    }
  };

  return (
    <div className="booking-box-container">
      <div className="price-info">
        <span className="current-price">£{property.price_per_night}</span>
        <span className="per-night">per night</span>
      </div>

      <div className="booking-inputs">
        <div className="date-input-wrapper">
          <div className="date-input check-in">
            <span className="label">CHECK-IN</span>
            <span className="value">{formatDate(checkInDate)}</span>
          </div>
          <div className="date-input check-out">
            <span className="label">CHECK-OUT</span>
            <span className="value">{formatDate(checkOutDate)}</span>
          </div>
        </div>
      </div>

      <div className="guest-selector" ref={dropRef}>
        <GuestSelector
          guestCount={guest}
          setGuestCount={setGuest}
          isOpen={isGuestOpen}
          onClick={() => setIsGuestOpen(!isGuestOpen)}
        />
      </div>

      {nights > 0 && (
        <div className="price-breakdown">
          <div className="breakdown-line">
            <span>
              £{property.price_per_night} x {nights} nights
            </span>
            <span>£{totalPrice}</span>
          </div>
        </div>
      )}

      <div className="breakdown-line total-price">
        <span>Total: </span>
        <span>£{totalPrice}</span>
      </div>

      {error && <div className="error-message">{error}</div>}
      <button className="reserve-button" onClick={handleReserve}>
        Reserve
      </button>

      <LoginModal isModal={isLoginModal} setIsModal={setIsLoginModal} />
    </div>
  );
}
