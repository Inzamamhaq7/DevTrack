
import { useEffect, useState } from "react";

function readStoredValue(key, initialValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return typeof initialValue === "function"
        ? initialValue()
        : initialValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Failed to read localStorage key "${key}":`, error);

    return typeof initialValue === "function"
      ? initialValue()
      : initialValue;
  }
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStoredValue(key, initialValue)
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Failed to save localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
