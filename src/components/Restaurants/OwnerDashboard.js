import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaYelp } from 'react-icons/fa';  
import './OwnerDashboard.css';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';

function OwnerDashboard() {
    const [restaurant, setRestaurant] = useState({
        name: '',
        email: '',
        location: '',
        phone: '',
        cuisine: '',
        zipcode: '',
        hours: '',
        imageUrls: '',
        menu: '',
        website: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant({ ...restaurant, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/restaurants/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(restaurant)
            });
            if (!response.ok) throw new Error('Failed to add restaurant');
            alert('Restaurant added successfully!');
            navigate('/list');
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding restaurant');
        }
    };

    return (
        <div className="dashboard-wrapper">
            <header className="header">
                <div className="logo">
                    <FaYelp size="30" style={{ color: 'white' }} />
                    YYYYYelppppppp for business
                </div>
            </header>
            <div className="owner-dashboard">
                <h2 className="dashboard-heading">Great! Now Create Your Business Here</h2>
                <form onSubmit={handleSubmit} className="business-form">
                    <input type="text" name="name" value={restaurant.name} onChange={handleChange} placeholder="Business Name" />
                    <input type="email" name="email" value={restaurant.email} onChange={handleChange} placeholder="Email Address" />
                    <div className="inline-fields">
                        <div className="field">
                            <input type="text" name="location" value={restaurant.location} onChange={handleChange} placeholder="Business Location" />
                        </div>
                        <div className="field">
                            <input type="text" name="zipcode" value={restaurant.zipcode} onChange={handleChange} placeholder="ZIP Code" />
                        </div>
                    </div>
                    <input type="text" name="phone" value={restaurant.phone} onChange={handleChange} placeholder="Contact Phone" />
                    <input type="text" name="cuisine" value={restaurant.cuisine} onChange={handleChange} placeholder="Cuisine Type" />
                    <input name="hours" value={restaurant.hours} onChange={handleChange} placeholder="Operating Hours"/>
                    <input name="imageUrls" value={restaurant.imageUrls} onChange={handleChange} placeholder="Image URLs" />
                    <input type="text" name="menu" value={restaurant.menu} onChange={handleChange} placeholder="Menu URL" />
                    <input type="text" name="website" value={restaurant.website} onChange={handleChange} placeholder="Website URL" />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
    </div>
    );
}

export default OwnerDashboard;
