import "./modalButtons.css";
import "./sort.css";

export default function Order({
  order,
  setOrder,
  collapseOrder,
  setCollapseOrder,
}) {
  const orderOptions = [
    { label: "Ascending", key: "asc" },
    { label: "Descending", key: "desc" },
  ];

  return (
    <div className="collapse-section">
      <div
        className="collapse-header"
        onClick={() => setCollapseOrder(!collapseOrder)}
      >
        <h2>Order by</h2>
        <span className="arrow">{collapseOrder ? "˄" : "˅"}</span>
      </div>
      {collapseOrder && (
        <div className="modal-buttons">
          {orderOptions.map((option) => (
            <button
              key={option.key}
              className={`modal-button ${order === option.key ? "active" : ""}`}
              onClick={() => setOrder(order === option.key ? "" : option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
