import React , { useState, useEffect } from 'react';
import moment from 'moment/moment';
import { FaBook, FaCamera } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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

const PhotoGallery = ({ name, images }) => {
    return (
        <div className="gallery-container">
            <div className="images-row">
                {images && images.map((imageUrl, index) => (
                    <span className="image-container" key={index}>
                        <img src={imageUrl} alt={`${name} - Image ${index + 1}`} />
                    </span>
                ))}
            </div>
            <div className="overlay-text">
                {name}
                <br />⭐ 3.3 (36 reviews)
            </div>
            <button className="see-all-button">
                <FaCamera /> See all {images.length} photos
            </button>
        </div>
    );
};


const Buttons = ({ restaurantId }) => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveToFavorites = () => {
        if (isSaved) return;

        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        fetch(`http://localhost:8080/api/v1/favorites/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
            body: JSON.stringify({ userId, restaurantId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setIsSaved(true); 
                alert('Added to favorites!');
            } else {
                throw new Error(data.message || 'Failed to save');
            }
        })
        .catch(error => {
            console.error('Error adding to favorites:', error);
            alert(error.message);
        });
    };


    return (
        <div className="interactive-buttons">
            <Link to={`/detail/${restaurantId}/write-review`} className="write-review-link">
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
            <button 
                className="button-save" 
                onClick={handleSaveToFavorites} 
                disabled={isSaved}
            >
                <FontAwesomeIcon icon={faBookmark} />
                <span style={{ marginLeft: '8px' }}>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
        </div>
    );
};


const ContactInfo = ({email, phone, location, website}) => (
    <div className="contact-info">
        <div className="website-link">
            {website}
        </div>
        <div className="email">
            <p>Email:</p> {email}
        </div>
        {/* <a href="https://www.popeyes.com/" target="_blank" rel="noopener noreferrer" className="website-link">
            popeyes.com
        </a> */}
        <div className="phone-number">
            <p>Phone:</p> {phone}
        </div>
        <div className="get-directions">
            <strong>Location:</strong> {location}
            <a href="#" className="get-directions-link">Get Directions</a>
            {/* <p>800 W Randolph St, Chicago, IL 60607</p> */}
        </div>
        <button className="edit-button">
            <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '8px' }}/>
            Suggest an edit
        </button>
    </div>
);

const Menu = ({ menu }) => {
    const handleFullMenuClick = (url) => {
        window.location.href = url; 
    };

    return (
        <div className="menu-container">
            <h3>Menu</h3>
            <div>
                <button className='menu-button' onClick={() => handleFullMenuClick(menu)}>
                    <FaArrowUpRightFromSquare />
                    <span style={{ marginLeft: '8px' }}>Website menu</span>
                </button>
                <button className='menu-button' onClick={() => handleFullMenuClick(menu)}>
                    <FaBook />
                    <span style={{ marginLeft: '8px' }}>Full menu</span>
                </button>
            </div>
        </div>
    );
};

const LocationAndHours = ({ address, hours }) => {
    
    const isCurrentlyOpen = (hours) => {
        if (!hours || hours.toLowerCase() === 'closed') {
            return false; 
        }

        const [openTime, closeTime] = hours.split(' - ');
        const now = moment();
        const startTime = moment(openTime, "hh:mm A");
        let endTime = moment(closeTime, "hh:mm A");

        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day'); 
        }

        if (now.isBefore(startTime) && now.format("A") === "AM") {
            startTime.subtract(1, 'day');
            endTime.subtract(1, 'day');
        }

        return now.isBetween(startTime, endTime);
    };

    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = moment().format('ddd'); 

    const sortedDays = Object.entries(hours).sort((a, b) => {
        return dayOrder.indexOf(a[0]) - dayOrder.indexOf(b[0]);
    });

    return (
        <div className="location-hours-container">
            <h3>Location & Hours</h3>
            <div className="location-hours-content">
                <div className="map-and-details">
                    <img src="https://maps.googleapis.com/maps/api/staticmap?size=315x150&sensor=false&client=gme-yelp&language=en&scale=1&zoom=15&center=40.802938%2C-72.868491&markers=scale%3A1%7Cicon%3Ahttps%3A%2F%2Fyelp-images.s3.amazonaws.com%2Fassets%2Fmap-markers%2Fannotation_32x43.png%7C40.802938%2C-72.868491&signature=XNQ01HCT3t3HQ6cARzDhXl2x7mM=" alt="Map" />
                    <div className="address-direction">
                        <div className="address">
                            {address}
                        </div>
                        <button className="get-directions-button">
                            Get directions
                        </button>
                    </div>
                </div>
                <div className="hours">
                    <table className="hours-table">
                        <tbody>
                            {sortedDays.map(([day, hours], index) => {
                                const open = isCurrentlyOpen(hours);
                                const isToday = day === today;
                                return (
                                    <tr key={index} className={isToday ? 'today' : ''}>
                                        <td>{day}</td>
                                        <td>
                                            <span className="hours-and-status">
                                                {hours}
                                                {isToday && (
                                                    <span className={`status ${open ? 'open' : 'closed'}`}>
                                                        {open ? 'Open now' : 'Closed now'}
                                                    </span>
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};



const RestaurantDetail = () => {
    const { restaurantId } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(data => {
                data.imageUrls = JSON.parse(data.imageUrls || '[]');
                data.hours = JSON.parse(data.hours);
                console.log(data.hours); //debug
                setRestaurantDetails(data);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                return <div>Error loading restaurant details.</div>;
            });
    }, [restaurantId]);

    if (!restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wrapper">
            <SearchBar />
            <PhotoGallery name={restaurantDetails.name} images={restaurantDetails.imageUrls} />
            <div className='main-content'>
                <div className="info-column">
                    <Buttons restaurantId={restaurantDetails.id} />
                    <Menu 
                        website={restaurantDetails.website}
                        // fullMenuUrl={restaurantDetails.fullMenuUrl}
                    />
                    <LocationAndHours address={restaurantDetails.location} hours={restaurantDetails.hours} />
                    <RecommendedReviews />
                </div>
                <div className="order-column">
                    <ContactInfo
                        email={restaurantDetails.email}
                        phone={restaurantDetails.phone}
                        location={restaurantDetails.location}
                        website={restaurantDetails.website}
                    />
                </div>
            </div>
        </div>
    );
}

export default RestaurantDetail;