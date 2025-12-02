import { useEffect, useState } from "react";
import {
  deleteBooking,
  getPropertyBookings,
  getUserBookings,
  patchBooking,
} from "../../utils/api";
import LoadingDots from "../PropertyDetails/LoadingDots";
import Calendar from "../../utils/Calendar.jsx";
import "./userBookings.css";
import Modal from "../Search-Filter/Filter/Modal.jsx";
import CloseButton from "../../icons/CloseButtonIcon.jsx";

export default function UserBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const data = await getUserBookings(user.id, user.token);
      setBookings(data.bookings);
      setIsLoading(false);
    };

    fetchUserBookings();
  }, [user.id, user.token]);

  const fetchBookings = async (propertyId) => {
    try {
      const data = await getPropertyBookings(propertyId);

      const dates = data.bookings.map((booking) => ({
        start: new Date(booking.check_in_date),
        end: new Date(booking.check_out_date),
      }));

      setBookedDates(dates);
    } catch (error) {
      console.log("Failed to fetch bookings:", error);
    }
  };

  const removeBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId, user.token);
      setBookings((bookings) =>
        bookings.filter((booking) => booking.booking_id !== bookingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setCheckInDate(booking.checkInDate);
    setCheckOutDate(booking.checkOutDate);
    fetchBookings(booking.property_id);
    setIsModal(true);
  };

  const updateBooking = async (bookingId) => {
    const data = await patchBooking(
      bookingId,
      checkInDate,
      checkOutDate,
      user.token
    );

    //Could use fetch user bookings for more safety
    setBookings(
      bookings.map((booking) =>
        booking.booking_id === bookingId
          ? { ...booking, ...data.booking }
          : booking
      )
    );

    setIsModal(false);
  };

  const getBookingStatus = (checkOutDate) => {
    const today = new Date();
    return new Date(checkOutDate) < today ? "Past" : "Upcoming";
  };

  if (isLoading) return <LoadingDots />;

  return (
    <>
      <div className="user-bookings-container">
        {bookings.map((booking) => (
          <div key={booking.booking_id} className="booking-card-main">
            <div className="booking-card">
              <img src={booking.image} alt={booking.property_name} />
              <div className="booking-info">
                <h3>{booking.property_name}</h3>
                <p>
                  {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                  {new Date(booking.check_out_date).toLocaleDateString()}
                </p>
                <span
                  className={`booking-status ${getBookingStatus(
                    booking.check_out_date
                  )}`}
                >
                  {getBookingStatus(booking.check_out_date)}
                </span>
              </div>
            </div>
            <div className="booking-btn">
              <button
                className="edit-modal"
                onClick={() => {
                  handleEdit(booking);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  removeBooking(booking.booking_id);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModal && (
        <Modal onClick={() => setIsModal(false)}>
          <div className="booking-edit-calendar">
            <div className="calendar-scale">
              <Calendar
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                monthsShown={2}
                bookedDates={bookedDates}
              />
            </div>
            <button
              className="close-modal-btn"
              onClick={() => setIsModal(false)}
            >
              <CloseButton />
            </button>

            <button
              className="edit-submit"
              type="submit"
              disabled={isLoading}
              onClick={() => updateBooking(selectedBooking.booking_id)}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
