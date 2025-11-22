import "./modalButtons.css";

export default function PropertyType({
  uniquePropertyTypes,
  selectType,
  setSelectType,
}) {
  return (
    <div>
      <h2>Property types</h2>
      <div className="modal-buttons">
        {uniquePropertyTypes.map((type) => (
          <button
            key={type}
            className={`modal-button ${selectType === type ? "active" : ""}`}
            onClick={() =>
              setSelectType((selection) => (selection === type ? "" : type))
            }
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
