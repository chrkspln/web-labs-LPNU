import React from "react";
import './Catalog.css';

const CatalogItem = ({
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
            <p className="perfume__price">${price.toLocaleString()}</p>
        </div>
    );
}

export default CatalogItem;