import React, { useState, useEffect, useRef } from 'react';
import './OverallRating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCamera, faSearch, faCaretDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import StarRatingInput from './StarRatingInput';

const UserReviewPrompt = () => {
    const [rating, setRating] = useState(0);

    return (
        <div className="user-review-prompt">
            <div className="user-avatar">
                <img
                    src="https://s3-media0.fl.yelpcdn.com/assets/public/default_user_avatar_64x64_v2.yji-19e0a8ff85b15f4bbd79.png"
                    alt="User Avatar"
                    className="avatar-img"
                />
            </div>
            <div className="user-details">
                <div style={{ fontWeight: 'bold' }}>Username</div>
                <div>Location</div>
                <div className="user-metrics">
                    <FontAwesomeIcon icon={faCamera} /> <span>0</span>
                    <FontAwesomeIcon icon={faStar} /> <span>0</span>
                </div>
            </div>
            <div className="user-review-action">
                <StarRatingInput setRating={setRating} />
                <a href="#" className="start-review-link">Start your review of Popeyes Louisiana Kitchen</a>
            </div>
        </div>
    );
};

const OverallRating = () => (
    <div className="overall-rating-container">
        <div className="overall-rating">
            <span className="rating-title">Overall rating</span>
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star, index) => (
                    <FontAwesomeIcon 
                        key={index} 
                        icon={faStar} 
                        className="star-icon" 
                        color={index < 4 ? "#ffb400" : "#e4e5e9"} 
                    />
                ))}
            </div>
            <span className="review-count">36 reviews</span>
        </div>
        <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((star) => (
                <div className="rating-row" key={star}>
                    <span>{star} {star === 1 ? 'star' : 'stars'}</span>
                    <div className="rating-bar">
                        <div className={`rating-fill rating-${star}`}></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ReviewFilters = () => (
    <div className="review-filters">
        <div className="filter-buttons">
            <button className="filter-button">
                Yelp Sort
                <FontAwesomeIcon icon={faCaretDown} className="caret-icon" />
            </button>
            <button className="filter-button">Filter by rating
                <FontAwesomeIcon icon={faCaretDown} className="caret-icon" />
            </button>
        </div>
        <div className="search-reviews">
            <input type="text" placeholder="Search reviews" />
            <FontAwesomeIcon icon={faSearch} />
        </div>
    </div>
);

const ReviewList = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const actionMenuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="review-list">
            <div className="review-item">
                <div className="review-avatar">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/assets/public/default_user_avatar_64x64_v2.yji-19e0a8ff85b15f4bbd79.png"
                        alt="Review Avatar"
                        className="review-avatar-img"
                    />
                </div>
                <div className="review-content">
                    <div className="review-header">
                        <h5>Colette G.</h5>
                    </div>
                    <p className="user-location">Shoreham, NY</p>
                    <div className="review-metrics">
                        <span>162 <FontAwesomeIcon icon={faCamera} /></span>
                        <span>500 <FontAwesomeIcon icon={faStar} /></span>
                        <span>462 <FontAwesomeIcon icon={faStar} /></span>
                    </div>
                    <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star, index) => (
                            <FontAwesomeIcon icon={faStar} key={index} className="star-icon" />
                        ))}
                    </div>
                    <p className="review-date">Dec 10, 2021</p>
                    <p className="review-text">
                        This review is strictly for chicken sandwich, and the drive thru. WOW! Those commercials you see of people moaning in their vehicle over how good it is...is no lie!
                    </p>
                    <p className="review-text">
                        My family hates Popeyes. I love it. Happened to be in area, and alone..so drive thru sandwich as it's more car friendly than a chicken meal.
                    </p>
                    <p className="review-text">
                        I'm blown away. So so good.
                    </p>
                    <div className="review-actions" ref={actionMenuRef}>
                        <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="ellipsis-icon"
                            onClick={() => setMenuVisible(!menuVisible)}
                        />
                        {menuVisible && (
                            <div className="action-menu">
                                <div className="action-item">Share review</div>
                                <div className="action-item">Embed review</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RecommendedReviews = () => (
    <div className="recommended-reviews-container">
        <h3>Recommended Reviews</h3>
        <UserReviewPrompt />
        <OverallRating />
        <ReviewFilters />
        <ReviewList />
    </div>
);

export default RecommendedReviews;
