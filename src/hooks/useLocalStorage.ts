import { useState, useEffect } from 'react';
import { AUTH_TOKEN_KEY } from '../constants/KEY_NAMES';

// The key used in localStorage

type StateValue = string | null;

export function useLocalStorage() {
  const [value, setValue] = useState<StateValue>(() => {
    try {
      const storedValue = localStorage.getItem(AUTH_TOKEN_KEY);
      return storedValue ? storedValue : null;
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } else {
        localStorage.setItem(AUTH_TOKEN_KEY, value);
      }
    } catch (error) {
      console.error("Failed to write to localStorage:", error);
    }
  }, [value]);

  return [value, setValue] as const;
}