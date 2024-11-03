import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
      <div className="about-us-wrapper">
        <h2>
          <span className="underline-light_blue">About Us</span>
        </h2>
        <div className="about-us-div">
          <div className="flex-row">
            <div className="about-us-item eachdiv col-2">
              <div className="about-us-content">
                <h4 className="about-us-title">Nice to meet you there!</h4>
                <p className="about-us-text">
                    Discover a world where scent meets sophistication at our perfume store, where every fragrance
                    tells a story. From timeless classics to modern masterpieces, our curated selection of perfumes
                    embodies elegance, allure, and individuality. Step inside to explore luxurious, hand-picked scents
                    crafted by world-renowned perfumers, designed to captivate the senses and elevate your style.
                    Find your perfect match in a realm of aromas that awaken memories and create new ones.
                    Experience the art of fragrance with us, where your signature scent awaits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AboutUs;