import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from './AuthContext'; 
import './Login.css';

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const { saveToken } = useAuth(); 

    const login = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080/api/v1/auth/authenticate";
        const data = { email, password };

        axios.post(url, data).then(response => {
            const token = response.data;  
            console.log("Extracted token:", token);  
            if (token) {
                localStorage.setItem('username', token.username);
                localStorage.setItem('role', token.role);
                console.log(token.role);
                localStorage.setItem('userId', token.userId);
                console.log(token.userId);
                saveToken(token); 
                navigate('/list'); 
            } else {
                console.log("Authentication failed: No token received.");
                alert("Login Failed. Please check your credentials.");
            }
        }).catch(error => {
            console.error("Login error:", error);
            alert("Login Failed. Please check your credentials and try again.");
        });



    };

    return (
        <div className="login-container">
            <div className="login-header">Log in to YYYYYelppppppp</div>
            <form onSubmit={login} className="login-form">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Log In</button>
                <div className="login-links">
                    <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    <a href="/signup" className="signup-link">New to Yelp? Sign up</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
