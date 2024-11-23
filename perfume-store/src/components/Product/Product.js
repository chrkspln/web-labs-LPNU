import React, {useContext, useState} from 'react';
import { PerfumeContext } from '../../context/PerfumeContext';
import ProductItem from './ProductItem';
import Button from "../../utilities/Button";
import Loader from "../../utilities/Loader";
import './Product.css';

const Products = () => {
  const { perfumes, loading } = useContext(PerfumeContext);
    const [showAll, setShowAll] = useState(false);
    const handleViewMore = () => {
        setShowAll(!showAll);
    };
    const displayedPerfumes = showAll ? perfumes : perfumes.slice(0, 4);

    return (
      <div className="product-wrapper">
        <h2>
          <span className="underline-light_blue">Our Best Perfumes</span>
        </h2>
          {loading ? (
              <Loader />
          ) : (
        <div className="product-div">
          <div className="flex-row">
            {displayedPerfumes.map((perfume) => (
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
          )}
          <Button onClick={handleViewMore} className="view-more-btn">
              {showAll ? 'Less' : 'View more'}
          </Button>
      </div>
  );
};

export default Products;
