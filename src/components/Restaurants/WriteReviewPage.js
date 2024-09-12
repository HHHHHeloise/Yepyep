import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaYelp } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import StarRatingInput from './StarRatingInput'; 
import './WriteReviewPage.css';
import './Restaurants.css';
import ImageUploader from './ImageUploader';
import { useAuth } from '../Auth/AuthContext';

function WriteReviewPage() {
    const authContext = useAuth();
    const token = authContext.token;
    console.log("Auth Context:", authContext); 
    console.log("Token:", authContext.token); 
    const { restaurantId } = useParams();
    const [body, setBody] = useState("");
    const [score, setScore] = useState(0);
    const [images, setImages] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const modalRef = useRef();

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showModal]);

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

    const uploadImages = async () => {
        const formData = new FormData();
        images.forEach(image => formData.append('images', image));

        const response = await fetch(`http://localhost:8080/api/v1/photos/upload/${restaurantId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to upload images');
        return response.json(); // Assuming this returns an array of image URLs
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (body.trim() === "" || score === 0) {
            alert("Please enter a review and select a score before submitting.");
            return;
        }

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        try {
            let imageUrls = [];
            if (images.length > 0) {
                imageUrls = await uploadImages(); // Upload images first
            }

            const reviewData = new FormData();
            reviewData.append('body', body);
            reviewData.append('score', score);
            reviewData.append('restaurantId', restaurantId);
            imageUrls.forEach(url => reviewData.append('imageUrls', url)); // Append image URLs to the review data

            const reviewResponse = await fetch('http://localhost:8080/api/v1/reviews/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                },
                body: reviewData
            });

            if (!reviewResponse.ok) throw new Error('Failed to submit review');

            alert('Review and images uploaded successfully!');
            navigate(`/detail/${restaurantId}`);
        } catch (error) {
            console.error('Error submitting review and images:', error);
            alert('Error submitting review and images. Please try again.');
        }

        // console.log('Attempting to submit review with token:', token);

        // event.preventDefault();
        // const reviewData = new FormData(); // Use FormData to handle text and file data
        // reviewData.append('body', body);
        // reviewData.append('score', score);
        // reviewData.append('userId', authContext.userId);
        // reviewData.append('restaurantId', restaurantId);

        // fetch('http://localhost:8080/api/v1/reviews/add', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify(reviewData),
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Failed to submit review');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Review submitted successfully:', data);
        //     navigate('/detail/write-review/success'); 
        // })
        // .catch(error => {
        //     console.error('Error submitting review:', error);
        //     alert('Error submitting review. Please try again.');
        // });
    };


    return (
        <div>
            <header className="header">
                <div className="logo"><FaYelp size="30" style={{ color: 'white' }} /></div>
            </header>
            <div className="write-review-page">
                <h2>{restaurantName}</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    {/* <!-- Review text section --> */}
                    <div className="review-box">
                        <StarRatingInput setRating={setScore} />
                        <textarea value={body} onChange={handleInputChange} placeholder="Share your experience..." className="review-textarea"></textarea>
                    </div>
                    <button type="submit" className="post-review-button">Post Review</button>
                </form>
                    {/* <!-- Attach photos section --> */}
                    <label className="attach-photos-label">Attach photos</label>
                    <div className="photos-box">
                        <div className="file-upload-container">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <IoMdAddCircle size={24} color="black" onClick={() => setShowModal(true)} />
                            </label>
                        </div>
                    </div>
                    {/* <button type="submit" className="post-review-button">Post Review</button> */}
                
                {showModal && (
                    <div className="modal">
                        <div ref={modalRef} className="modal-content">
                            <ImageUploader />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WriteReviewPage;