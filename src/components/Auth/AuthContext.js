import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(window.sessionStorage.getItem('token'));

    const saveToken = (newToken) => {
        window.sessionStorage.setItem('token', newToken);
        setToken(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};
