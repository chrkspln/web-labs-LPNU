import React from 'react';
import '../styles/Product.css';

const ProductItem = ({
                         image,
                         name,
                         brand,
                         scent,
                         volume,
                         price
                     }) => {
    return (
        <div className="product-item eachdiv col-2">
            <div className="img-box">
                <img src={image} alt={name}/>
            </div>
            <div className="det-box">
                <p className="name">{name}</p>
                <p className="brand">{brand}</p>
                <p className="scent">{scent}</p>
                <p className="volume">{volume} ml</p>
                <p className="price">${price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ProductItem;
