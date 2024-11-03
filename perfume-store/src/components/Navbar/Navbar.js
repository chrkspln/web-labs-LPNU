import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><a href="/public">Home</a></li>
                <li className="navbar-item"><a href="/catalog">Catalog</a></li>
                <li className="navbar-item"><a href="/cart">Cart</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;