import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import AuthForm from './Login/AuthForm';
import Register from './Register/Register';
import Home from './Home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for user token when the app loads
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setIsLoggedIn(true); // If a token exists, set the user as logged in
    }
  }, []);

  // ProtectedRoute component to restrict access based on login state
  const ProtectedRoute = ({ children }) => {
    if (isLoggedIn) {
      return <Navigate to="/home" />; // Redirect to login if not logged in
    }
    return children; // If logged in, render the children components
  };

  return (
    <Router>
      <Box>
        <Routes>
          {/* Define routes */}
          <Route path="/login" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* Protected Route for Home */}
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <AuthForm setIsLoggedIn={setIsLoggedIn}  />
              </ProtectedRoute>
            }
          />

          {/* Redirect to home or login based on authentication */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
