import React from 'react';
import './AboutPerfumesCard.css';

const AboutPerfumesCard = ({ icon, title, text }) => {
  return (
    <div className="about-perfumes__card">
        <p className="about-perfumes__card__icon">{icon}</p>
      <p className="about-perfumes__card__title">{title}</p>
      <p className="about-perfumes__card__text">{text}</p>
    </div>
  );
};

export default AboutPerfumesCard;
