import React from 'react';
import { FaSearch } from 'react-icons/fa'; 
import './RestaurantList.css';

const SearchBar = () => (
  <header className="header">
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Restaurants"
        className="searchInput"
        aria-label="Search for restaurants"
      />
      <input
        type="text"
        placeholder="Address, neighborhood"
        className="locationInput"
        aria-label="Location"
      />
      <button className="searchButton">
        <FaSearch />
      </button>
    </div>
  </header>
);

const Filters = () => (
  <div className="filters">
    <div className="filterSection">
      <button className="button">$</button>
      <button className="button">$$</button>
      <button className="button">$$$</button>
      <button className="button">$$$$</button>
    </div>
    <div className="filterSection">
      <label className="checkboxLabel">
        <input type="checkbox" className="checkbox" />
        Open Now
      </label>
      <label className="checkboxLabel">
        <input type="checkbox" className="checkbox" />
        Reservations
      </label>
    </div>
    <div className="filterSection">
      <button className="categoryButton">Mexican</button>
      <button className="categoryButton">Sandwiches</button>
    </div>
  </div>
);

const RestaurantEntry = ({ imageSrc, name, tags, rating, reviewCount, url }) => (
  <div className="restaurantEntry">
    <img src={imageSrc} alt={name} className="restaurantImage" />
    <div className="restaurantDetails">
      <a href={url} className="restaurantName">{name}</a>
      <div className="restaurantTags">{tags.join(' · ')}</div>
      <div className="restaurantRating">{`Rating: ${rating} (${reviewCount} reviews)`}</div>
    </div>
  </div>
);

const RestaurantListing = () => {
  const restaurantsData = [
    {
      imageSrc: 'image_url', // Replace with actual image path or url
      name: 'M & M Bagels',
      tags: ['Breakfast & Brunch', 'Bagels', 'Closed until 07:00 tomorrow'],
      rating: 4.5,
      reviewCount: 233,
      url: '#', // Replace with actual link to restaurant's page
    },
  ];

  return (
    <div className="wrapper">
      <SearchBar />
      <div className="content">
        <Filters />
        <div className="restaurantsList">
          {restaurantsData.map((restaurant, index) => (
            <RestaurantEntry key={index} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListing;
