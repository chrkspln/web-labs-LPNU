import React from 'react';
import { Link } from 'react-router-dom';
import './Success.css';
const Success = () => {
    return (
        <div className="success-container">
            <h2>Order Placed Successfully!</h2>
            <p>
                Thank you for your purchase. Your order has been placed and is being processed.
            </p>
            <Link to="/" className="home-link">
                Return to Home
            </Link>
        </div>
    );
};
export default Success;