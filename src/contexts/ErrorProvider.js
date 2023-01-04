import React, { createContext, useState, useMemo, useContext } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const value = useMemo(
    () => ({
      error,
      setError,
    }),
    [error]
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
}

export const useErrorContext = () => useContext(ErrorContext);
