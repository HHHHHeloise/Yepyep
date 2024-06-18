import React, { useState } from 'react';
import './WriteReviewPage.css';

function WriteReviewPage() {
    const [review, setReview] = useState("");  
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (review.trim() === "") {
            alert("Please enter a review before submitting.");
            return;
        }

        setSubmitting(true);

        setTimeout(() => {
            console.log('Review Submitted:', review); 
            setSubmitting(false);
            setSubmitted(true);
            setReview(""); 
        }, 1000); 
    };

    return (
        <div className="review-container">
            <h2>Write Your Review</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={review}
                    onChange={handleInputChange}
                    placeholder="Share your experience..."
                    rows="4"  
                    cols="50" 
                ></textarea>
                <button type="submit" className="submit-button" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
            {submitted && <p className="submit-success">Review Submitted!</p>}
        </div>
    );
}

export default WriteReviewPage;
