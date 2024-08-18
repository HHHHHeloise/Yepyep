import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantList.css';
import './Restaurants.css'; 
import SearchBar from './Restaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';


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

const RestaurantEntry = ({ id, imageUrls, name, rating, cuisine, price, isOpen, features, description, reviews }) => {
  const navigate = useNavigate();
  
  const firstImageUrl = (imageUrls && imageUrls.length > 0) ? imageUrls[0].url : 'default-image.jpg';
  const getStarColor = rating => {
    if (rating >= 4) return "red";
    if (rating >= 3) return "orange";
    return "yellow";
  };
  const cuisines = cuisine ? cuisine.split(',').map(c => c.trim()) : [];

    return (
        <div className="restaurantEntry" onClick={() => navigate(`/detail/${id}`)}>
            <img src={firstImageUrl} alt={name} className="restaurantImage" />
            <div className="restaurantDetails">
                <h2 className="restaurantName">{name}</h2>
                <div className="restaurantMeta">
                    <span className="restaurantRating">
                        {Array.from({ length: Math.round(rating) }, (_, i) => (
                          <FontAwesomeIcon icon={faStar} color={getStarColor(rating)} key={i} />
                        ))}
                    </span>
                    <span className="restaurantReviews">({reviews} reviews)</span>
                    <div className="restaurantCuisines">
                        {cuisines.map(cuisine => (
                            <span className="tag" key={cuisine}>{cuisine}</span>
                        ))}
                        <span className="restaurantPrice">{price}</span>
                    </div>
                </div>
                <div className="restaurantDescription">
                  <FontAwesomeIcon icon={faRocketchat} /> {description}
                </div>
                {/* <div className="restaurantFeatures">
                    {features.delivery && <span>Delivery</span>}
                    {features.takeout && <span>Takeout</span>}
                </div> */}
            </div>
        </div>
    );
};

const RestaurantListing = () => {
    const [restaurants, setRestaurants] = useState([]);
    
    const navigate = useNavigate(); 

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log(role);
    const userId = localStorage.getItem('userId');
    console.log(userId);

    let endpoint = 'http://localhost:8080/api/v1/restaurants/searchByLocation';
    let body = JSON.stringify({ location: 'Stony Brook' });

    if (role === 'owner') {
      endpoint = 'http://localhost:8080/api/v1/restaurants/searchByOwner';
      body = JSON.stringify({ createdBy: userId });
    }

        fetch(endpoint, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
          },
          body: body 
        })
        .then(response => response.json())
        .then(data => {
            setRestaurants(data); 
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }, []); 

    const handleSearchResults = (results) => {
        setRestaurants(results);
        console.log(results);
    };

    return (
        <div className="wrapper">
            <SearchBar onSearch={handleSearchResults} />
            <div className="content">
                <Filters />
                <div className="restaurantsList">
                  {restaurants.length > 0 ? (
                    restaurants.map((restaurant, index) => (
                      <RestaurantEntry key={index} {...restaurant} onClick={() => navigate(`/detail/${restaurant.id}`)} />
                    ))
                  ) : (
                    <div>No restaurants found</div>
                  )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantListing;
