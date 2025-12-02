import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

import { getPropertyById, postBooking } from "../../utils/api";
import "./booking.css";
import LoadingDots from "../PropertyDetails/LoadingDots";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const checkInISO = searchParams.get("checkInDate");
  const checkOutISO = searchParams.get("checkOutDate");
  const checkInDate = new Date(checkInISO);
  const checkOutDate = new Date(checkOutISO);
  const guest = +searchParams.get("guest");
  const nights = +searchParams.get("nights");

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data.property);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Failed to load property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!user) return "Please login or signup!";
  if (isLoading || !property)
    return (
      <div>
        <LoadingDots />
      </div>
    );

  const totalPrice = nights * property.price_per_night;

  const handleConfirmBooking = async () => {
    setIsProcessing(true);

    try {
      const data = await postBooking(
        property.property_id,
        user.id,
        checkInDate.toISOString(),
        checkOutDate.toISOString(),
        user.token
      );

      setIsProcessing(false);
      navigate(`/users/${user.id}?section=bookings`);
    } catch (err) {
      console.error(err);
      setError("Booking failed. Try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="booking-page-container">
      <div className="header">
        <span className="back-arrow" onClick={() => navigate(-1)}>
          &larr;
        </span>
        <h1>Confirm and pay</h1>
      </div>

      <div className="booking-main-content">
        <div className="booking-left-column">
          <div className="booking-section active">
            <h2 className="section-instruction">Reservation details</h2>
          </div>
          <button
            className="confirm-button"
            disabled={isProcessing}
            onClick={handleConfirmBooking}
          >
            {isProcessing ? "…" : "Confirm Reservation"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="booking-right-column">
          <div className="summary-box">
            <div className="property-card">
              <img
                src={property.images[0]}
                alt={property.property_name}
                className="property-image"
              />
              <div className="property-header">
                <h2>{property.property_name}</h2>
              </div>
            </div>
            <div className="section-divider"></div>
            <div className="booking-details-group">
              <h4>Dates</h4>
              <p>
                {formatDate(checkInDate)} {" - "}
                {formatDate(checkOutDate)}
              </p>
            </div>
            <div className="section-divider"></div>
            <div className="booking-details-group">
              <h4>Guests</h4>
              <p>
                {guest} Guest{guest !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="section-divider"></div>
            <div className="price-details">
              <div className="price-line">
                <span>
                  {nights} nights x £{property.price_per_night}
                </span>
                <span>£{totalPrice}</span>
              </div>
              <div className="price-line total">
                <span>Total</span>
                <span>£{totalPrice}</span>
              </div>
            </div>
            <div className="savings-alert">
              <span className="check-icon">✓</span>
              To change details, please go back!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
