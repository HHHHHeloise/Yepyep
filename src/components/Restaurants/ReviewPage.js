import React, { useState, useEffect, useRef } from 'react';
import './OverallRating.css';
import './WriteReviewPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCamera, faSearch, faCaretDown, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import StarRatingInput from './StarRatingInput';
import axios from 'axios';


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

const WriteReviewForm = ({ restaurantId, onCancel }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [tags, setTags] = useState({ food: false, service: false, ambiance: false });

    const handleTagClick = (tag) => {
        setTags({ ...tags, [tag]: !tags[tag] });
    };

    const submitReview = () => {
        const token = window.sessionStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const data = {
            restaurantId,
            rating,
            reviewText,
            tags
        };

        axios.post('http://localhost:8080/api/reviews', data, config)
            .then(response => {
                console.log(response.data);
                onCancel();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="write-review-page">
            <h1>Write a Review</h1>
            <div className="review-input">
                <StarRatingInput setRating={setRating} />
                <textarea 
                    placeholder="Write your review here..." 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <div className="tags">
                    <span onClick={() => handleTagClick('food')} className={tags.food ? 'tag active' : 'tag'}>Food</span>
                    <span onClick={() => handleTagClick('service')} className={tags.service ? 'tag active' : 'tag'}>Service</span>
                    <span onClick={() => handleTagClick('ambiance')} className={tags.ambiance ? 'tag active' : 'tag'}>Ambiance</span>
                </div>
            </div>
            <button className="post-review-button" onClick={submitReview}>Post Review</button>
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
    );
};


const RecommendedReviews = ({ restaurantId }) => {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [writingReview, setWritingReview] = useState(false);

    const fetchReviews = () => {
        axios.get(`http://localhost:8080/api/restaurants/${restaurantId}/reviews`)
            .then(response => {
                setReviews(response.data.reviews);
                setAverageRating(response.data.averageRating);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, [restaurantId]);

    return (
        <div className="recommended-reviews-container">
            {writingReview ? (
                <WriteReviewForm 
                    restaurantId={restaurantId} 
                    onCancel={() => setWritingReview(false)} 
                />
            ) : (
                <>
                    <h3>Recommended Reviews</h3>
                    <UserReviewPrompt onWriteReview={() => setWritingReview(true)} />
                    <OverallRating averageRating={averageRating} reviewCount={reviews.length} />
                    <ReviewFilters />
                    <ReviewList reviews={reviews} />
                </>
            )}
        </div>
    );
};

export default RecommendedReviews;
