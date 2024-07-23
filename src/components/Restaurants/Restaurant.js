import React, { useState } from 'react';
import { FaYelp, FaSearch } from 'react-icons/fa';  
import { Link } from 'react-router-dom';
import './Restaurants.css';

const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const isAuthenticated = localStorage.getItem('token') ? true : false; 
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    const handleSearch = () => {
        const searchUrl = `http://localhost:8080/api/v1/restaurants/`;
        let endpoint = '';
        const requestBody = {};

        if (name && location) {
            endpoint = 'searchByNameAndLocation'; 
            requestBody.name = name;
            requestBody.location = location;
        } else if (name) {
            endpoint = 'search';
            requestBody.name = name;
            requestBody.location = "Stony Brook";  // Default location
        } else if (location) {
            endpoint = 'searchByLocation';
            requestBody.location = location;
        }

        fetch(searchUrl + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(data => {
            onSearch(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error performing the search:', error);
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const getRandomColor = () => {
        const colors = ['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const userIconStyle = {
        backgroundColor: getRandomColor()
    };

    const DropdownMenu = ({ role }) => {
        return (
            <div className="dropdown-menu">
                {role === 'owner' ? (
                    <>
                        <a href="/manage-restaurant" className="dropdown-item">Manage your restaurant</a>
                        <a href="/account-settings" className="dropdown-item">Account settings</a>
                    </>
                ) : (
                    <>
                        <a href="/manage-favorites" className="dropdown-item">Manage your favorites</a>
                        <a href="/account-settings" className="dropdown-item">Account settings</a>
                    </>
                )}
            </div>
        );
    };


    return (
        <header className="header">
            <div className="logo">
                <FaYelp size="30" style={{ color: 'white' }} />
                YYYYYelppppppp
            </div>
            <div className="searchContainer">
                <input
                    type="text"
                    placeholder="Restaurants"
                    className="searchInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <input
                    type="text"
                    placeholder="Brookhaven, NY 11719"
                    className="locationInput"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="searchButton" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>
                <div className="navLinks">
                    {isAuthenticated ? (
                    <div className="user-section">
                            {role === 'owner' && (
                                <Link to="/start-business" className="navLink-button">Start Your Business</Link>
                            )}
                            <div className="userIcon" style={userIconStyle}>
                                {username ? username.charAt(0).toUpperCase() : 'U'}
                                <DropdownMenu role={role} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <a href="#" className="navLink">Yelp for Business</a>
                            <a href="#" className="navLink">Write a Review</a>
                            <Link to="/login" className="navLink-button">Log In</Link>
                            <Link to="/signup" className="navLink-button">Sign Up</Link>
                        </>
                    )}
            </div>
        </header>
    );
};

export default SearchBar;
