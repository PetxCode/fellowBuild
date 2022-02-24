import React, { useState, useContext, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrent] = useState(null);

  useEffect(() => {
    setCurrent(JSON.parse(localStorage.getItem("voter")));
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
