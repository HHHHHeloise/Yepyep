import React from 'react';
import { FaBook, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Restaurants.css';
import './RestaurantList.css'; 
import './DetailPage.css';
import './ReviewPage.css';
import RecommendedReviews from './ReviewPage';
import SearchBar from './Restaurant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FaArrowUpFromBracket, FaArrowUpRightFromSquare } from 'react-icons/fa6';

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
                Popeyes Louisiana Kitchen
                <br />⭐ 3.3 (36 reviews)
            </div>
            <button className="see-all-button">
                <FaCamera /> See all 33 photos
            </button>
        </div>
    );
};


const Buttons = () => {
    return (
        <div className="interactive-buttons">
            <Link to="/detail/write-review" className="write-review-link">
                <FontAwesomeIcon icon={faStar} />
                <span style={{ marginLeft: '8px' }}>Write a review</span>
            </Link>
            <button className="button-add-photo">
                <FontAwesomeIcon icon={faCamera} />
                <span style={{ marginLeft: '8px' }}>Add photo</span>
            </button>
            <button className="button-share">
                <FaArrowUpFromBracket />
                <span style={{ marginLeft: '8px' }}>Share</span>
            </button>
            <button className="button-save">
                <FontAwesomeIcon icon={faBookmark} />
                <span style={{ marginLeft: '8px' }}>Save</span>
            </button>
        </div>
    );
};


const ContactInfo = () => (
    <div className="contact-info">
        <a href="https://www.popeyes.com/" target="_blank" rel="noopener noreferrer" className="website-link">
            popeyes.com
        </a>
        <div className="phone-number">
            <p>(312) 929-4580</p>
        </div>
        <div className="get-directions">
            <a href="#" className="get-directions-link">Get Directions</a>
            <p>800 W Randolph St, Chicago, IL 60607</p>
        </div>
        <button className="edit-button">Suggest an edit</button>
    </div>
);


const Menu = () => (
    <div className="menu-container">
        <h3>Menu</h3>
        <div>
            <button className='menu-button'>
                <FaArrowUpRightFromSquare />
                <span style={{ marginLeft: '8px' }}>Website menu</span>
            </button>
            <button className='menu-button'>
                <FaBook/>
                <span style={{ marginLeft: '8px' }}>Full menu</span>
            </button>
        </div>
    </div>
);

const LocationAndHours = () => (
    <div className="location-hours-container">
        <h3>Location & Hours</h3>
        <div className="location-hours-content">
            <div className="map-and-details">
                    <img src="https://maps.googleapis.com/maps/api/staticmap?size=315x150&sensor=false&client=gme-yelp&language=en&scale=1&zoom=15&center=40.802938%2C-72.868491&markers=scale%3A1%7Cicon%3Ahttps%3A%2F%2Fyelp-images.s3.amazonaws.com%2Fassets%2Fmap-markers%2Fannotation_32x43.png%7C40.802938%2C-72.868491&signature=XNQ01HCT3t3HQ6cARzDhXl2x7mM=" alt="Map" />
                <div className="address-direction">
                    <div className="address">
                        <p>17 McGraw St</p>
                        <p>Shirley, NY 11967</p>
                    </div>
                    <button className="get-directions-button">
                        Get directions
                    </button>
                </div>
            </div>
            <div className="hours">
                <table className="hours-table">
                    <tbody>
                        <tr><td>Mon</td><td>10:30 AM - 11:00 PM</td></tr>
                        <tr><td>Tue</td><td>10:30 AM - 11:00 PM</td></tr>
                        <tr><td>Wed</td><td>10:30 AM - 11:00 PM</td><td className="status">Open now</td></tr>
                        <tr><td>Thu</td><td>10:30 AM - 11:00 PM</td></tr>
                        <tr><td>Fri</td><td>10:30 AM - 11:00 PM</td></tr>
                        <tr><td>Sat</td><td>10:30 AM - 11:00 PM</td><td className="status closed">Closed now</td></tr>
                        <tr><td>Sun</td><td>10:30 AM - 11:00 PM</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button className="suggest-edit-button">
            <span style={{ marginRight: '8px' }}>Suggest an edit</span>
            <FontAwesomeIcon icon="fa-solid fa-pencil" />
            <FontAwesomeIcon icon={faPencilAlt} />
        </button>
    </div>
);


const RestaurantDetail = () => (
    <div className="wrapper">
        <SearchBar />
        <PhotoGallery />
        <div className='main-content'>
            <div className="info-column">
                <Buttons />
                <Menu />
                <LocationAndHours />
                <RecommendedReviews />
            </div>
            <div className="order-column">
                <ContactInfo />
            </div>
        </div>
    </div>
);

export default RestaurantDetail;