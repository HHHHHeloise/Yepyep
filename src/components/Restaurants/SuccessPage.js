import React from 'react';
import './Restaurants.css';
import './RestaurantList.css'; 
import './DetailPage.css';
import './ReviewPage.css';
import SearchBar from './Restaurant';

function SuccessPage() {
    return (
        <div>
            <SearchBar />
            <div className="submit-success-page">
                <h2>Your review is now live!</h2>
            </div>
        </div>
    );
}

export default SuccessPage;
