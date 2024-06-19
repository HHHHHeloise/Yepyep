import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './StarRatingInput.css';

const StarRatingInput = ({ setRating }) => {
    const [hover, setHover] = useState(0);
    const [rating, setRatingState] = useState(0);

    const getRatingLabel = (ratingValue) => {
        switch (ratingValue) {
            case 0:
                return 'Select your rating';
            case 1:
                return 'Not Good';
            case 2:
                return 'Could’ve been better';
            case 3:
                return 'OK';
            case 4:
                return 'Good';
            case 5:
                return 'Great';
            default:
                return '';
        }
    };

    return (
        <div className="star-rating-input">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span 
                        key={index}
                        onClick={() => {
                            setRating(ratingValue);
                            setRatingState(ratingValue);
                        }}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <FontAwesomeIcon
                            icon={faStar}
                            className="star"
                            size="2x"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        />
                    </span>
                );
            })}
            <span className="rating-label" style={{ color: (hover || rating) === 0 ? '#9b9b9b' : '#000' }}>
                {getRatingLabel(hover || rating)}
            </span>
        </div>
    );
};

export default StarRatingInput;
