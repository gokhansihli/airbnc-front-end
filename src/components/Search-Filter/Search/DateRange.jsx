import DatePicker from "react-datepicker";
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
          <DatePicker
            selected={checkInDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setCheckInDate(start);
              setCheckOutDate(end);
            }}
            startDate={checkInDate}
            endDate={checkOutDate}
            selectsRange
            inline
            minDate={new Date()}
            monthsShown={2}
          />
        </div>
      )}
    </div>
  );
}
