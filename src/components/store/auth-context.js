import React, { useState, useEffect, useRef } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  // Set an auto logout timer for 5 minutes (300,000 milliseconds)
  const tokenExpirationTime = 300000; // 5 minutes in milliseconds
  const logoutTimerRef = useRef();

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    // Set an auto logout timer
    logoutTimerRef.current = setTimeout(() => {
      logoutHandler();
      alert('You have been logged out due to inactivity. Please log in again.');
    }, tokenExpirationTime);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');

    // Clear the auto logout timer if the user manually logs out
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
  };

  // Set up an effect to handle auto logout on component mount
  useEffect(() => {
    if (userIsLoggedIn) {
      // Calculate the remaining time before token expiration
      const remainingTime = tokenExpirationTime - (Date.now() - new Date(localStorage.getItem('tokenTimestamp')));

      // Set an auto logout timer based on remaining time
      logoutTimerRef.current = setTimeout(() => {
        logoutHandler();
        alert('You have been logged out due to inactivity. Please log in again.');
      }, remainingTime);
    }
  }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
