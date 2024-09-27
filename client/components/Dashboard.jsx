import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleUserDetails = () => {
        navigate('/user-details');
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button className="btn" onClick={handleUserDetails}>View User Details</button>
            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
