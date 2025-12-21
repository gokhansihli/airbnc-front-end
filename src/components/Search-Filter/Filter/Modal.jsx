import { createPortal } from "react-dom";
import "./modal.css";
import { useEffect } from "react";

export default function Modal({ children, onClick, maxWidth }) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, [onclick]);

  return createPortal(
    <div className="modal-overlay" onClick={onClick}>
      <div
        className="modal-content"
        style={{ maxWidth: maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}
