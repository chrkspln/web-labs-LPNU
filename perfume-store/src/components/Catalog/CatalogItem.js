import React from "react";
import './Catalog.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const CatalogItem = ({
                         id,
                         image,
                         name,
                         brand,
                         scent,
                         volume,
                         price
}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <div className="perfume-card">
            <img src={image} alt={name} className="perfume__image" />
            <p className="perfume__name">{name}</p>
            <p className="perfume__brand">{brand}</p>
            <p className="perfume__scent">{scent}</p>
            <p className="perfume__volume">{volume} ml</p>
            <p className="perfume__price">₴{price.toLocaleString()}</p>
            {isAuthenticated ? (
                <Link to={`/perfume/${id}`} className="view-details-link">
                    View Details
                </Link>
            ) : (
                <Link to="/login" className="view-details-link">
                    Log in to view Details
                </Link>
            )}
        </div>
    );
}

export default CatalogItem;