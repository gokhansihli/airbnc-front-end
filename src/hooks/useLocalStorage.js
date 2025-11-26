import { useState } from "react";

export default function useLocalStorage(initialValue = null) {
  const key = "user";
  const [storedValue, setStoredValue] = useState(() => getValue());

  // Setter
  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  //getter
  function getValue() {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(error);
      localStorage.removeItem(key);
      return initialValue;
    }
  }

  return [storedValue, setValue];
}
