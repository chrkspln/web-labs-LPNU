import React, { useContext } from 'react';
import { PerfumeContext } from '../../context/PerfumeContext';
import ProductItem from './ProductItem';
import './Product.css';

const Products = () => {
  const { perfumes } = useContext(PerfumeContext);

  return (
      <div className="product-wrapper">
        <h2>
          <span className="underline-light_blue">Our Best Perfumes</span>
        </h2>
        <div className="product-div">
          <div className="flex-row">
            {perfumes.map((perfume) => (
                    <ProductItem key={perfume.id}
                                 image={perfume.image}
                                 name={perfume.name}
                                 brand={perfume.brand}
                                 scent={perfume.scent}
                                 volume={perfume.volume}
                                 price={perfume.price}
                    />
                ))}
          </div>
        </div>
      </div>
  );
};

export default Products;
