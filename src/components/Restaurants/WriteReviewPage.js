import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaYelp } from 'react-icons/fa';
import StarRatingInput from './StarRatingInput'; 
import './WriteReviewPage.css';

function WriteReviewPage() {
    const [review, setReview] = useState("");  
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (review.trim() === "" || rating === 0) {
            alert("Please enter a review and select a rating before submitting.");
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            console.log('Review Submitted:', review); 
            setSubmitting(false);
            setSubmitted(true);
            setReview(""); 
            setRating(0);
            setSelectedTags([]);
            navigate('/detail/write-review/success'); // Redirect to success page
        }, 1000); 
    };

    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => 
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <FaYelp size="30" style={{ color: 'white' }} /> Yelp
                </div>
                <div>
                    <button className="navLink">Log In</button>
                    <button className="navLink-button">Sign Up</button>
                </div>
            </header>
            <div className="write-review-page">
                <h2>Popeyes Louisiana Kitchen</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="review-box">
                        <StarRatingInput setRating={setRating} />
                        <div className='reminder'>A few things to consider in your review </div>
                        <div className="tags">
                            {['Food', 'Service', 'Ambiance'].map(tag => (
                                <span 
                                    key={tag} 
                                    className={`tag ${selectedTags.includes(tag) ? 'active' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <textarea 
                            value={review}
                            onChange={handleInputChange}
                            placeholder="Share your experience..."
                            className="review-textarea"
                        ></textarea>
                    </div>
                    <button type="submit" className="post-review-button" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Post Review'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default WriteReviewPage;
