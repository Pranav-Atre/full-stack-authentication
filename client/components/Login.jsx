import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            login(response.data.user, response.data.token); 
            navigate('/dashboard');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
                console.log(err);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="register-link">
                Don’t have an account? <span onClick={() => navigate('/register')} className="link">Register here</span>
            </p>
        </div>
    );
};

export default Login;
