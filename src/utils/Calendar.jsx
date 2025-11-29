import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Search-Filter/Search/dateRange.css";

export default function Calendar({
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  bookedDates = [],
}) {
  const handleChange = (dates) => {
    const [start, end] = dates;
    setCheckInDate(start);
    setCheckOutDate(end);
  };

  return (
    <div className="date-range">
      <DatePicker
        selected={checkInDate}
        onChange={handleChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        selectsRange
        inline
        minDate={new Date()}
        monthsShown={2}
        excludeDateIntervals={bookedDates}
      />
    </div>
  );
}
