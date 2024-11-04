import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PerfumeContext } from '../../context/PerfumeContext';
import './PerfumeDetails.css';

const PerfumeDetails = () => {
    const { perfumes } = useContext(PerfumeContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const perfume = perfumes.find(perfume => perfume.id == id);

    console.log("Route ID:", id);
    console.log("Perfumes:", perfumes);
    console.log("Perfume Details:", perfume);

    if (!perfume) {
        return <div className="container mx-auto px-4 py-8">Perfume not found</div>;
    }

    const handleGoBack = () => {
        navigate('/catalog');
    };

    const volumes = ["15ml", "30ml", "50ml", "75ml", "100ml"];

    return (
        <div className="perfume-detail-container">
            <div className="perfume-detail">
                <img src={perfume.image} alt={perfume.name} className="perfume-detail-image" />
                <div className="perfume-info">
                    <h3 className="perfume-detail-title">{perfume.name}</h3>
                    <p className="perfume-detail-description">
                        {perfume.detailedDescription ? perfume.detailedDescription : "No detailed description available"}
                    </p>

                    <div className="perfume-detail-add-info">
                        <div className="perfume-selector-container">
                            <h4>Select Volume:</h4>
                            <select className="perfume-selector">
                                <option value="">Select</option>
                                {volumes.map((volume) => (
                                    <option key={volume} value={volume}>{volume}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {perfume.characteristics && (
                        <div className="characteristics-grid">
                            {Object.entries(perfume.characteristics).map(([key, value]) => (
                                <div key={key} className="characteristic-item">
                                    <span className="characteristic-label">{key}:</span>
                                    <span className="characteristic-value">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="perfume-actions">
                <p className="perfume-price">Price: ₴{perfume.price.toLocaleString()}</p>
                <div className="action-buttons">
                    <button onClick={handleGoBack}>Go Back</button>
                    <button>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default PerfumeDetails;