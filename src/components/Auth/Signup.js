import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/api/v1/auth/signup";
        const userData = {
            username,
            email,
            password,
            role
        };

        try {
            const response = await axios.post(url, userData);
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.response.data);
        }
    };

return (
        <div className="signup-container">
            <div className="login-header">Sign in to YYYYYelppppppp</div>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="signup-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <div className="role-selection">
                    <div>Sign Up As</div>
                    <label>
                        <input type="radio" name="role" value="customer" checked={role === 'customer'} onChange={() => setRole('customer')}/> Customer
                    </label>
                    <label>
                        <input type="radio" name="role" value="owner" checked={role === 'owner'} onChange={() => setRole('owner')}/> Restaurant Owner
                    </label>
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                <div className="login-link">
                    Already on Yelp? <a href="/login">Log in</a>
                </div>
            </form>
        </div>
    );
}

export default Signup;
