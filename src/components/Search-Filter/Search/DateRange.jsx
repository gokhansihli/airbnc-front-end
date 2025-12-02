import Calendar from "../../../utils/Calendar";
import "react-datepicker/dist/react-datepicker.css";
import "./dateRange.css";

export default function DateRange({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  isOpen,
  onClick,
}) {
  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        })
      : "";
  };

  return (
    <div className="search-section" onClick={onClick}>
      <span className="label">Date</span>
      <span className="value">
        {checkInDate && checkOutDate
          ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
          : "Add dates"}
      </span>
      {isOpen && (
        <div
          className="date-picker-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            setCheckInDate={setCheckInDate}
            setCheckOutDate={setCheckOutDate}
          />
        </div>
      )}
    </div>
  );
}
