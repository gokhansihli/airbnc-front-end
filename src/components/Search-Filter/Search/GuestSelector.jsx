import "./guestSelector.css";

export default function GuestSelector({
  guestCount,
  setGuestCount,
  isOpen,
  onClick,
}) {
  const handleIncrement = () => {
    setGuestCount(guestCount + 1);
  };

  const handleDecrement = () => {
    setGuestCount(Math.max(0, guestCount - 1));
  };

  return (
    <div className="search-section guest-section" onClick={onClick}>
      <span className="label">Guests</span>
      <span className="value">
        {guestCount > 0
          ? `${guestCount > 1 ? `${guestCount} guests` : `${guestCount} guest`}`
          : "Add guests"}
      </span>

      {isOpen && (
        <div className="guest-dropdown" onClick={(e) => e.stopPropagation()}>
          <div className="guest-counter">
            <span>{guestCount > 1 ? `Guests` : `Guest`}</span>
            <div className="controls">
              <button onClick={handleDecrement} disabled={guestCount === 0}>
                –
              </button>
              <span className="count-value">{guestCount}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
