import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import Loader from "../../utilities/Loader";
import Select from '../../utilities/Select';
import './PerfumeDetails.css';
import {getPerfumeById} from "../../service/api";
import {addToCart} from "../../redux/cartActions";
import Input from "../../utilities/Input";

const PerfumeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [perfume, setPerfume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVolume, setSelectedVolume] = useState("");
    const [selectedQuantity, setQuantity] = useState(1);
    const [maxStock, setMaxStock] = useState(0);

    const volumes = [
        { value: '', label: 'Select Volume' },
        ...perfume?.stock.map(stockItem => ({
            value: stockItem.volume,
            label: stockItem.volume + ' ml'
        })) || []
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

    const handleGoToCart = () => {
        navigate('/cart');
    }

    const handleVolumeChange = (event) => {
        const volume = event.target.value;
        setSelectedVolume(volume);
        setQuantity(1);

        const selectedStockItem = perfume.stock.find(stock => stock.volume === parseInt(volume, 10));
        console.log(selectedStockItem);
        selectedStockItem ? setMaxStock(selectedStockItem.quantity) : setMaxStock(0);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = Number(event.target.value);
        if (newQuantity > maxStock) {
            setQuantity(maxStock);
            alert(`Only ${maxStock} items are available in ${selectedVolume} volume.`);
        } else {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!selectedVolume) {
            alert("Please select a volume.");
            return;
        }
        dispatch(
            addToCart({
                ...perfume,
                selectedQuantity,       // User-defined quantity
                selectedVolume, // User-selected volume
            })
        );
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

                    <div className="perfume-quantity-container">
                        <h4>Select Quantity:</h4>
                        <Input
                            type="number"
                            value={selectedQuantity}
                            min="1"
                            max={maxStock}
                            onChange={handleQuantityChange}
                            disabled={!selectedVolume}
                        />
                        {selectedVolume && !maxStock && <p>No stock available for this volume</p>}
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
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleGoToCart}>Go to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default PerfumeDetails;