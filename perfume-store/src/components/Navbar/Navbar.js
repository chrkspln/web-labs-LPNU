import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><Link to="/public">Home</Link></li>
                <li className="navbar-item"><Link to="/catalog">Catalog</Link></li>
                <li className="navbar-item"><Link to="/cart">Cart</Link></li>
                <li className="navbar-item"><Link to="/public">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;