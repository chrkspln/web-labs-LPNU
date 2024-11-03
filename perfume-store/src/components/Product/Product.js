import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import ViewMoreButton from './ViewMoreButton';
import './Product.css';

const perfumes = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    name: "Suu...",
    brand: "Masaki Matsushima",
    scent: "Floral",
    volume: 80,
    price: 1171.00
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    name: "Mat.",
    brand: "Masaki Matsushima",
    scent: "Floral, Fruity",
    volume: 40,
    price: 985.00,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    name: "Marry Me!",
    brand: "Lanvin",
    scent: "Floral, Fruity",
    volume: 30,
    price: 1007.00,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    name: "Parfum d'Ete",
    brand: "Kenzo",
    scent: "Floral, Green",
    volume: 75,
    price: 2428.00,
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    name: "Noa",
    brand: "Cacharel",
    scent: "Floral, Aldehyde",
    volume: 30,
    price: 909.00,
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    name: "Equus Pour Homme",
    brand: "Lalique",
    scent: "Woody, Spicy",
    volume: 100,
    price: 1976.00,
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    name: "Terre d'Hermès",
    brand: "Hermès",
    scent: "Woody, Mineral",
    volume: 100,
    price: 2695.00,
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    name: "Armani Code",
    brand: "Giorgio Armani",
    scent: "Woody, Aromatic",
    volume: 60,
    price: 1742.00,
  }
];

const Products = () => {
  const [showAll, setShowAll] = useState(false);

  const handleViewMore = () => {
    setShowAll(!showAll);
  };

  return (
      <div className="product-wrapper">
        <h2>
          <span className="underline-light_blue">Our Best Perfumes</span>
        </h2>
        <div className="product-div">
          <div className="flex-row">
            {perfumes
                .slice(0, showAll ? perfumes.length : 4)
                .map((perfume) => (
                    <ProductItem key={perfumes.id} image={perfumes.image} name={perfumes.name} brand={perfumes.brand} scent={perfumes.scent} volume={perfumes.volume} price={perfumes.price} />
                ))}
          </div>
        </div>
        <ViewMoreButton onClick={handleViewMore} text={showAll ? 'Less' : 'View more'} />
      </div>
  );
};

export default Products;
