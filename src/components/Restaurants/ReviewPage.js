// RecommendedReviews.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const RecommendedReviews = () => (
    <div className="recommended-reviews-container">
        <h3>Recommended Reviews</h3>
        <div className="user-review-prompt">
            <div className="user-avatar">
                <img src="https: //s3-media0.fl.yelpcdn.com/assets/public/default_user_avatar_64x64_v2.yji-19e0a8ff85b15f4bbd79.png" alt="User Avatar" className="avatar-img" />
            </div>
            <div className="user-details">
                <h4>Username</h4>
                <p>Location</p>
                <div className="user-metrics">
                    <FontAwesomeIcon icon={faCamera} /> <span>0</span>
                    <FontAwesomeIcon icon={faStar} /> <span>0</span>
                </div>
            </div>
            <div className="user-review-action">
                <div className="user-review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesomeIcon icon={faStar} key={star} className="star-icon" />
                    ))}
                    <span>Select your rating</span>
                </div>
                <a href="#" className="start-review-link">Start your review of Popeyes Louisiana Kitchen</a>
            </div>
        </div>
        <div className="overall-rating">
            <h4>Overall rating</h4>
            <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon icon={star <= 3.5 ? faStar : faStarHalfAlt} key={star} className="star-icon" />
                ))}
                <span>36 reviews</span>
            </div>
            <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map((star) => (
                    <div className="rating-row" key={star}>
                        <span>{star} stars</span>
                        <div className="rating-bar">
                            <div className={`rating-fill rating-${star}`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="review-filters">
            <button className="filter-button">Yelp Sort</button>
            <button className="filter-button">Filter by rating</button>
        </div>
        <div className="review-list">
            <div className="review-item">
                <div className="review-avatar"></div>
                <div className="review-content">
                    <h5>Colette G.</h5>
                    <p>Shoreham, NY</p>
                    <div className="review-metrics">
                        <span>162</span>
                        <span>500</span>
                        <span>461</span>
                    </div>
                    <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesomeIcon icon={faStar} key={star} className="star-icon" />
                        ))}
                    </div>
                    <p className="review-date">Dec 10, 2021</p>
                    <p className="review-text">
                        This review is strictly for chicken sandwich, and the drive thru. WOW! Those commercials you see of people moaning in their vehicle over how good it is...is no lie!
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default RecommendedReviews;
