import React from 'react';
import { FaSearch, FaYelp } from 'react-icons/fa'; 
import './Restaurants.css';

const SearchBar = () => (
    <header className="header">
        <div className="logo">
            <FaYelp size="30" style={{ color: 'white' }} /> YYYYYelppppppp
        </div>
        <div className="searchContainer">
            <input type="text" placeholder="Restaurants" className="searchInput" />
            <input type="text" placeholder="Brookhaven, NY 11719" className="locationInput" />
            <button className="searchButton">
                <FaSearch />
            </button>
        </div>
        <div className="navLinks">
            <a href="#" class="navLink">Yelp for Business</a>
            <a href="#" class="navLink">Write a Review</a>
            <a href="#" class="navLink-button">Log In</a>
            <a href="#" class="navLink-button">Sign Up</a>
        </div>
    </header>
);
    
export default SearchBar;