import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Restaurants.css'; 

const BackgroundImage = () => (
    <div className="backgroundImage"></div>
);

const Logo = () => (
    <div className="logo">
        <img src="https://www.jellycat.com/images/products/large/A4OAT.jpg" alt="Logo" />
    </div>
);

const SearchBar = () => (
    <div className="searchBarContainer">
        <input
            type="text"
            placeholder="Restaurant"
            className="searchInput"
        />
        <input
            type="text"
            placeholder="Location"
            className="locationInput"
        />
        <button className="searchButton">
            <FaSearch />
        </button>
    </div>
);

const AuthButtons = () => (
    <div className="authButtons">
        <button className="loginButton">Log In</button>
        <button className="signupButton">Sign Up</button>
    </div>
);



const App = () => {
    return (
        <div className="app">
            <BackgroundImage />
            <MainHeader />
            <GoogleMap />
        </div>
    );
};

export default App;
