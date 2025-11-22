import { createPortal } from "react-dom";
import "./modal.css";

export default function Modal({ children, onClick }) {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div className="modal-overlay" onClick={onClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
