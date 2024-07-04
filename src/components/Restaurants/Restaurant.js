import React, { useState } from 'react';
import { FaYelp, FaSearch } from 'react-icons/fa';  // Assuming you are using react-icons

const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

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
                <a href="#" className="navLink">Yelp for Business</a>
                <a href="#" className="navLink">Write a Review</a>
                <a href="#" className="navLink-button">Log In</a>
                <a href="#" className="navLink-button">Sign Up</a>
            </div>
        </header>
    );
};

export default SearchBar;
