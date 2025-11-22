import { useEffect, useRef } from "react";

export default function outsideClick(closeAll) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeAll();
      }
    }

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [closeAll]);

  return ref;
}
