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

const Filters = () => {
  return (
    <div className="filterContainer">
      <h2>Filters</h2>
      <div className="filterSection">
        <h3>Price</h3>
        <div className="filterButtonContainer">
          <button className="filterButton">$</button>
          <button className="filterButton">$$</button>
          <button className="filterButton">$$$</button>
          <button className="filterButton">$$$$</button>
        </div>
      </div>
      <div className="filterSection">
        <h3>Suggested</h3>
        <label className="checkboxLabel"><input type="checkbox" /> Open Now</label>
        <label className="checkboxLabel"><input type="checkbox" /> Offers Delivery</label>
        <label className="checkboxLabel"><input type="checkbox" /> Offers Takeout</label>
        <label className="checkboxLabel"><input type="checkbox" /> Good for Dinner</label>
        <label className="checkboxLabel"><input type="checkbox" /> Outdoor Seating</label>
        <label className="checkboxLabel"><input type="checkbox" /> Good for Lunch</label>
      </div>
      <div className="filterSection">
        <h3>Category</h3>
        <div className="categoryButtonContainer">
          <button className="categoryButton">New American</button>
          <button className="categoryButton">Italian</button>
          <button className="categoryButton">Restaurants</button>
          <button className="categoryButton">American</button>
          <button className="categoryButton">Steakhouses</button>
          <button className="categoryButton">Seafood</button>
        </div>
      </div>
      <div className="seeAll">See all</div>
    </div>
  );
};

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
  // This data could come from an API call
  const restaurantsData = [
    // Example entry
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