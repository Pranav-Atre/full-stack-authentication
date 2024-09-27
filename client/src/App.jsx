import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';  
import UserDetails from '../components/UserDetails';
import PrivateRoute from '../components/PrivateRoute';
import { UserProvider } from '../context/UserContext';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/user-details" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <UserDetails />
            </PrivateRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
