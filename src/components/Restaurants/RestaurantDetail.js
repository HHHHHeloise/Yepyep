import React from 'react';
import { FaStar, FaPhotoVideo } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa';
import { FaSearch, FaYelp } from 'react-icons/fa'; 
import './Restaurants.css'
import './RestaurantList.css'; 
import './DetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
            <a href="#" class="navLink button">Log In</a>
            <a href="#" class="navLink button">Sign Up</a>
        </div>
    </header>
    );

const images = [
    { src: 'https://s3-media0.fl.yelpcdn.com/bphoto/Hd09DnZQ3KQwYYZEHGEF_Q/348s.jpg', alt: 'Image 1' },
    { src: 'https://s3-media0.fl.yelpcdn.com/bphoto/0CZhclWC8rJvRHJtbQA4sw/o.jpg', alt: 'Image 2' },
    { src: 'https://s3-media0.fl.yelpcdn.com/bphoto/1MpbbKfGiGOkKpUxfKOoqQ/o.jpg', alt: 'Image 3' },
];

const PhotoGallery = () => {
    return (
        <div className="gallery-container">
            <div className="images-row">
                {images.map((image, index) => (
                    <span className="image-container" key={index}>
                        <img src={image.src} alt={image.alt} />
                    </span>
                ))}
            </div>
            <div className="overlay-text">
                Popeyes Louisiana Kitchen <br />⭐ 3.3 (36 reviews)
            </div>
            <button className="see-all-button">
                <FaCamera /> See all 33 photos
            </button>
        </div>
    );
};

const LocationHours = () => (
    <div className="location-hours">
        <h2>Location & Hours</h2>
        <div className="map-info">
            <div className="map-placeholder">Map will go here</div>
            <div className="hours">
                <p><strong>17 McGraw St</strong><br/>Shirley, NY 11967</p>
                <p><a href="#">Get directions</a></p>
                <ul>
                    <li>Mon: 10:30 AM - 11:00 PM</li>
                    <li>Tue: 10:30 AM - 11:00 PM</li>
                    <li>Wed: 10:30 AM - 11:00 PM</li>
                    <li>Thu: 10:30 AM - 11:00 PM</li>
                    <li>Fri: 10:30 AM - 11:00 PM <span className="closed">Closed now</span></li>
                    <li>Sat: 10:30 AM - 11:00 PM</li>
                    <li>Sun: 10:30 AM - 11:00 PM</li>
                </ul>
            </div>
        </div>
    </div>
);

const Buttons = () => (
    <div className="buttons-container">
        <button>Write a review</button>
        <button>Add photo</button>
        <button>Share</button>
        <button>Save</button>
    </div>
);

const Menu = () => (
    <div className="menu-container">
        <a href="#">Website menu</a>
        <a href="#">Full menu</a>
    </div>
);

const OrderFood = () => (
    <div className="order-food-container">
        <button>Start Order</button>
        <div>No Fees | Pick up in 7-17 mins</div>
    </div>
);

const RestaurantDetail = () => {
    return (
        <div className="wrapper">
            <SearchBar />
            <PhotoGallery />
            <Buttons />
            <Menu />
            <OrderFood />
            <LocationHours />
        </div>
    );
};

export default RestaurantDetail;
