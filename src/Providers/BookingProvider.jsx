import { useState } from "react";
import { BookingContext } from "../contexts/BookingContext";

export default function BookingProvider({ children }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);

  return (
    <BookingContext.Provider
      value={{
        selectedProperty,
        setSelectedProperty,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        guestCount,
        setGuestCount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
