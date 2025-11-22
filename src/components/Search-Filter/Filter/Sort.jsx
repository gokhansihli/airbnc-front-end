import "./modalButtons.css";
import "./sort.css";

export default function Sort({ sort, setSort, collapseSort, setCollapseSort }) {
  const sortOptions = [
    { label: "Cost per night", key: "cost_per_night" },
    { label: "Popularity", key: "popularity" },
    { label: "Favourite", key: "favourite" },
  ];

  return (
    <div className={`collapse-section ${collapseSort ? "" : "expanded"}`}>
      <div
        className="collapse-header"
        onClick={() => setCollapseSort(!collapseSort)}
      >
        <h2>Sort by</h2>
        <span className="arrow">{collapseSort ? "˄" : "˅"}</span>
      </div>
      {collapseSort && (
        <div className="modal-buttons">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              className={`modal-button ${sort === option.key ? "active" : ""}`}
              onClick={() => setSort(sort === option.key ? "" : option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
