import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            login(user, token);
            navigate('/dashboard');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Register</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="login-link">
                Already have an account? <span onClick={() => navigate('/login')} className="link">Login here</span>
            </p>
        </div>
    );
};

export default Register;
