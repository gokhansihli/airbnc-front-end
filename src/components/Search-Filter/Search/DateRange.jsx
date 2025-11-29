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
  return (
    <div className="search-section" onClick={onClick}>
      <span className="label">Date</span>
      <span className="value">
        {checkInDate && checkOutDate
          ? `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`
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
