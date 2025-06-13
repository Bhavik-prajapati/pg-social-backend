// File: AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isloggedin, setIsloggedin] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsloggedin(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isloggedin, setIsloggedin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
