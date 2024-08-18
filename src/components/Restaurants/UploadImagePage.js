import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UploadImagePage.css';
import { FaYelp } from 'react-icons/fa';
import { useAuth } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const UploadImagePage = () => {
    const authContext = useAuth();
    const token = authContext.token;
    const [files, setFiles] = useState([]); 
    const [dragOver, setDragOver] = useState(false);
    const { restaurantId } = useParams();
    const [restaurantName, setRestaurantName] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(data => setRestaurantName(data.name))
            .catch(error => console.error('Failed to load restaurant details', error));
    }, [restaurantId]);

    const handleFileChange = (e) => {
        e.preventDefault(); 
        let newFiles = e.target.files ? Array.from(e.target.files) : Array.from(e.dataTransfer.files);
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        files.forEach(file => formData.append('file', file));
        fetch(`http://localhost:8080/api/v1/photos/upload/${restaurantId}`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData,
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(() => {
            alert('Files uploaded successfully');
            setFiles([]); 
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            alert('Error uploading files: ' + error.message);
        });
    };

    const removeImage = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles); 
    };



    return (
        <div className="wrapper">
            <header className="header">
                <div className="logo"><FaYelp size="30" style={{ color: 'white' }} /></div>
            </header>
            <div className="upload-container">
                <h2>
                    <Link to={`/detail/${restaurantId}`} className="restaurant-link">{restaurantName}</Link> : Add Photos
                </h2>
                {files.length === 0 ? (
                    <div>
                        <div 
                            className={`drop-area ${dragOver ? 'drag-over' : ''}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
                            onDrop={handleFileChange}
                        >
                            <img className="illustration-img" src="https://s3-media0.fl.yelpcdn.com/assets/public/photo_review_325x200_v2.yji-9de7a3277cea44fd0377.svg" alt="Drag and drop photos here" />
                            <h3 className="info-text">Drag and drop photos here or</h3>
                            <p className="info-text">or</p>
                            <button onClick={() => fileInputRef.current.click()} className="browse-button">
                                Browse Files
                            </button>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="file-input"
                                ref={fileInputRef}
                                style={{ display: 'none' }} 
                            />
                        </div>
                    </div>
                ) : (
                        <div>
                            <h3>Almost Done! Add More and Upload!</h3>
                            <div className="photos-preview">
                                {files.map((file, index) => (
                                    <div key={index} className="preview-img-wrapper">
                                        <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="preview-img" />
                                        <button className="delete-img-btn" onClick={() => removeImage(index)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        <div className="photos-actions">
                                <Link onClick={() => fileInputRef.current.click()} className="browse-link">
                                    Browse    
                                </Link>
                                <span className="info-text">or drag and drop more photos</span>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="file-input"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                <button onClick={handleUpload} className="upload-button">Upload</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        );
    };
export default UploadImagePage;
