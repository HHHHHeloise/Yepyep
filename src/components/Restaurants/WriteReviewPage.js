import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaYelp } from 'react-icons/fa';
import StarRatingInput from './StarRatingInput'; 
import './WriteReviewPage.css';
import { useAuth } from '../Auth/AuthContext';

function WriteReviewPage() {
    const { token } = useAuth();
    const { restaurantId } = useParams();
    const [body, setBody] = useState("");
    const [score, setScore] = useState(0);
    const [restaurantName, setRestaurantName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(data => {
                setRestaurantName(data.name);
            })
            .catch(error => console.error('Failed to load restaurant details', error));
    }, [restaurantId]);

    const handleInputChange = (event) => {
        setBody(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (body.trim() === "" || score === 0) {
            alert("Please enter a review and select a score before submitting.");
            return;
        }

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        const reviewData = {
            restaurantId,
            body,
            score,
        };

        fetch('http://localhost:8080/api/v1/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to submit review');
            }
        })
        .then(data => {
            console.log('Review submitted successfully:', data);
            navigate('/detail/write-review/success');
        })
        .catch(error => {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        });
    };

    return (
        <div>
            <header className="header">
                <div className="logo"><FaYelp size="30" style={{ color: 'white' }} /></div>
            </header>
            <div className="write-review-page">
                <h2>{restaurantName}</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="review-box">
                        <StarRatingInput setRating={setScore} />
                        <textarea value={body} onChange={handleInputChange} placeholder="Share your experience..." className="review-textarea"></textarea>
                    </div>
                    <button type="submit" className="post-review-button">Post Review</button>
                </form>
            </div>
        </div>
    );
}

export default WriteReviewPage;
