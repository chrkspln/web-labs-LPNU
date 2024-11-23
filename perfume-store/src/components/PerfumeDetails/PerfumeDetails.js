import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from "../../utilities/Loader";
import Select from '../../utilities/Select';
import './PerfumeDetails.css';
import {getPerfumeById} from "../../service/api";

const PerfumeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [perfume, setPerfume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVolume, setSelectedVolume] = useState("");

    const volumes = [
        {value: "20", label: "20 ml"},
        {value: "30", label: "30 ml"},
        {value: "50", label: "50 ml"},
        {value: "75", label: "75 ml"},
        {value: "100", label: "100 ml"}
    ];

    useEffect(() => {
        setLoading(true);
        getPerfumeById(id).then((response) => {
            setPerfume(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, [id]);

    if (!perfume) {
        return <div className="container mx-auto px-4 py-8">Perfume not found</div>;
    }

    const handleGoBack = () => {
        navigate('/catalog');
    };

    const handleVolumeChange = (event) => {
        setSelectedVolume(event.target.value);
    }

    if (loading) {
        return <Loader />;
    }


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
                            <Select
                                options={volumes}
                                value={selectedVolume}
                                onChange={handleVolumeChange}
                            />
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