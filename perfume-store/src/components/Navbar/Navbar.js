import React from 'react';
import './Navbar.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../redux/authActions";


const Navbar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item"><Link to="/public">Home</Link></li>
                <li className="navbar-item"><Link to="/catalog">Catalog</Link></li>
                <li className="navbar-item"><Link to="/cart">Cart</Link></li>
                <li className="navbar-item"><Link to="/public">Contact</Link></li>
                {isAuthenticated ? (
                    <li className="navbar-item" onClick={handleLogout}><Link to="">Logout</Link></li>
                ) : (
                    <>
                        <li className="navbar-item"><Link to="/login">Login</Link></li>
                        <li className="navbar-item"><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;