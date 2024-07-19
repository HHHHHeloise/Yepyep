import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(window.sessionStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            window.sessionStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            window.sessionStorage.removeItem('token');
        }
    }, [token]);

    const saveToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            window.sessionStorage.setItem('token', newToken);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            window.sessionStorage.removeItem('token');
        }
    };


    return (
        <AuthContext.Provider value={{ token, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};
