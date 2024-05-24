import React from 'react';
import { FaSearch, FaYelp } from 'react-icons/fa'; 
import './RestaurantList.css';
import './Restaurants.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: -34.397,
    lng: 150.644
};

const GoogleMapDisplay = () => {
    return (
        <LoadScript
        googleMapsApiKey="AIzaSyCs17LYMw0FD7xUQg4oNFOfDjzCpEdCXwU">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            <Marker position={center} />
        </GoogleMap>
        </LoadScript>
    )
}



const SearchBar = () => (
  <header className="header">
    <div className="logo">
      <FaYelp size="30" style={{color: 'white'}} /> YYYYYelppppppp
    </div>
    <div className="searchContainer">
      <input
        type="text"
        placeholder="Restaurants"
        className="searchInput"
        aria-label="Search for restaurants"
      />
      <input
        type="text"
        placeholder="Brookhaven, NY 11719"
        className="locationInput"
        aria-label="Location"
      />
      <button className="searchButton">
        <FaSearch />
      </button>
    </div>
    <div className="navLinks">
      <a href="#" class="navLink">Yelp for Business</a>
      <a href="#" class="navLink">Write a Review</a>
      <a href="#" class="navLink button">Log In</a>
      <a href="#" class="navLink button">Sign Up</a>
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

const RestaurantEntry = ({ imageSrc, name, rating, cuisine, price, isOpen, features, description, reviews }) => {
  const getStarColor = rating => {
    if (rating >= 4) return "red";
    if (rating >= 3) return "orange";
    return "yellow";
  };
  const cuisines = cuisine.split(',').map(c => c.trim());

    return (
        <div className="restaurantEntry">
            <img src={imageSrc} alt={name} className="restaurantImage" />
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
  const restaurantsData = [
    // Example entry
    {
        id: 1,
        name: 'Popeyes Louisiana Kitchen',
        imageSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/Hd09DnZQ3KQwYYZEHGEF_Q/348s.jpg', // Replace with actual image path or url
        rating: 3.3,
        reviews: 36,
        cuisine: 'Fast Food, Chicken Wings',
        price: '$',
        address: '17 McGraw St',
        isOpen: true,
        features: ['Delivery', 'Takeout'],
        description: 'Ok so I absolutely loves Popeyes chicken, but what\'s going on with their biscuits lately.'
    },
    {
        id: 2,
        name: 'PORTERS on the lane',
        imageSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/Z_OvtL0x_GAgKfafm0p91g/348s.jpg',
        rating: 4.0,
        reviews: 304,
        cuisine: 'New American',
        price: '$$',
        features: ['Outdoor seating', 'Delivery', 'Takeout'],
        description: 'Fabulous service and attentive staff. Only gets better with each visit.'
    },
    {
        id: 3,
        name: "Avino's Italian Table",
        imageSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/xLo-9yl3xHK6XFZfna-MjQ/348s.jpg',
        rating: 4.0,
        reviews: 154,
        cuisine: 'Italian',
        price: '$$',
        features: ['Outdoor seating', 'Delivery'],
        description: 'Always delicious place for brunch! The pork Milanese is outstanding!'
    },
    {
        id: 4,
        name: "Varney's Restaurant",
        imageSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/LNvIEYjB41pERVWuxHnnAQ/348s.jpg',
        rating: 4.0,
        reviews: 152,
        cuisine: 'Seafood',
        price: '$$',
        features: ['Takeout'],
        description: 'Great seafood and burgers. A local favorite.'
    }
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
        <GoogleMapDisplay /> {/* Include the map component */}
      </div>
    </div>
  );
};

export default RestaurantListing;
