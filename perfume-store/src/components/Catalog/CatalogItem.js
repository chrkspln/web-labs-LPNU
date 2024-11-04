import React from "react";
import './Catalog.css';
import {Link} from "react-router-dom";

const CatalogItem = ({
                         id,
                         image,
                         name,
                         brand,
                         scent,
                         volume,
                         price
}) => {
    return (
        <div className="perfume-card">
            <img src={image} alt={name} className="perfume__image" />
            <p className="perfume__name">{name}</p>
            <p className="perfume__brand">{brand}</p>
            <p className="perfume__scent">{scent}</p>
            <p className="perfume__volume">{volume} ml</p>
            <p className="perfume__price">₴{price.toLocaleString()}</p>
            <Link to={`/perfume/${id}`} className="view-details-link">
                View Details
            </Link>
        </div>
    );
}

export default CatalogItem;