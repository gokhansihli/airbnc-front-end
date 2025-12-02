import { useState } from "react";

export default function UserInput({ type, value, onChange, onFinish }) {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const finish = () => {
    if (!isEditing) return; // Prevent double-call
    console.log("Finishing with value:", value);
    setIsEditing(false);
    setIsActive(false);
    onFinish?.();
  };

  return (
    <input
      className={`editable-field ${isActive ? "active" : ""}`}
      type={type || "text"}
      value={value}
      readOnly={!isEditing}
      spellCheck={false}
      onClick={() => {
        setIsEditing(true);
        setIsActive(true);
      }}
      onBlur={finish}
      onChange={(e) => {
        console.log("Input changed to:", e.target.value);
        onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.target.blur();
        }
      }}
    />
  );
}
