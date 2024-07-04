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

  // Parse the JSON string of image URLs and extract the first image
  const images = JSON.parse(imageUrls || '[]'); // Default to empty array if null
  const firstImageUrl = images.length > 0 ? images[0] : 'default-image.jpg'; // Provide a default image if none are available

  const getStarColor = rating => {
    if (rating >= 4) return "red";
    if (rating >= 3) return "orange";
    return "yellow";
  };
  const cuisines = cuisine ? cuisine.split(',').map(c => c.trim()) : [];

  // const cuisines = cuisine.split(',').map(c => c.trim());

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

const RestaurantShowing = () => {
  const restaurantsData = [
    // Example entry
    {
        id: 1,
        name: 'Popeyes Louisiana Kitchen',
        imageSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/Hd09DnZQ3KQwYYZEHGEF_Q/348s.jpg', 
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
      </div>
    </div>
  );
};

const RestaurantListing = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const endpoint = 'http://localhost:8080/api/v1/restaurants/searchByLocation';

        fetch(endpoint, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ location: 'Stony Brook' }) 
        })
        .then(response => response.json())
        .then(data => {
            setRestaurants(data); 
            // console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }, []); 

    const handleSearchResults = (results) => {
        setRestaurants(results);
        console.log(results);
        // if (results.length > 0) {
        //     navigate(`/detail/${results[0].id}`);
        // }
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
