import { useState } from "react";
import "./filter.css";

export default function Filter() {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div
        className="filter-bar"
        onClick={() => {
          setIsModal(true);
        }}
      >
        <div className="filter-symbol">&#x232F;</div>
        <div className="filter-section">Filters</div>
      </div>

      {isModal === true ? (
        <div
          className="modal-overlay"
          onClick={() => {
            setIsModal(false);
          }}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      ) : null}
    </>
  );
}
