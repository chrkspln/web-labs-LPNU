import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer__content-wrapper">
                <div className="footer__logo-copyright-wrapper">
                    <p className="grey-text">Note: store only sells perfumes that owner has, had or liked the description.</p>
                </div>
                <hr/>
                <div className="footer__social-media-icons">
                    <a href="#"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="#"><i className="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;