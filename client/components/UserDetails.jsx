import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './UserDetails.css';

const UserDetails = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default UserDetails;
