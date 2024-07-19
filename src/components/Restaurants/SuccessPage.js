import React from 'react';
import './Restaurants.css';
import './RestaurantList.css'; 
import './DetailPage.css';
import './ReviewPage.css';
import './SuccessPage.css';
import SearchBar from './Restaurant';
import { LuPartyPopper } from "react-icons/lu";

function SuccessPage() {
    return (
        <div>
            <SearchBar />
            <div className="submit-success-page">
                <LuPartyPopper size="50"/>
                <h2>Your review is now live!</h2>
            </div>
        </div>
    );
}


export default SuccessPage;
